package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"os"
	"os/exec"
	"runtime"
)

type Response struct {
	Status  bool   `json:"status"`
	Message string `json:"message,omitempty"`
}

func sendJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func sendNoURL(w http.ResponseWriter) {
	sendJSON(w, 400, Response{Status: false, Message: "no url present"})
}

func sendNoPath(w http.ResponseWriter) {
	sendJSON(w, 400, Response{Status: false, Message: "no path present"})
}

func sendNoConnection(w http.ResponseWriter) {
	sendJSON(w, 502, Response{Status: false, Message: "couldn't establish connection"})
}

func proxyHandler(w http.ResponseWriter, r *http.Request) {
	targetURL := r.URL.Query().Get("url")
	targetPath := r.URL.Query().Get("path")

	if targetURL == "" {
		sendNoURL(w)
		return
	}
	if targetPath == "" {
		sendNoPath(w)
		return
	}

	proxyReq, err := http.NewRequest(r.Method, "https://"+targetURL+targetPath, r.Body)
	if err != nil {
		sendJSON(w, 500, Response{Status: false, Message: "internal error"})
		return
	}

	// Копируем заголовки кроме Host
	for key, values := range r.Header {
		if key == "Host" {
			continue
		}
		for _, v := range values {
			proxyReq.Header.Add(key, v)
		}
	}

	client := &http.Client{}
	resp, err := client.Do(proxyReq)
	if err != nil {
		sendNoConnection(w)
		return
	}
	defer resp.Body.Close()

	// Копируем заголовки ответа
	for key, values := range resp.Header {
		for _, v := range values {
			w.Header().Add(key, v)
		}
	}
	w.WriteHeader(resp.StatusCode)
	io.Copy(w, resp.Body)
}

func openBrowser(url string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
	case "darwin":
		cmd = exec.Command("open", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}
	cmd.Start()
}

func writeConfig(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	os.WriteFile("config.json", body, 0644)
	sendJSON(w, 200, Response{Status: true})
}

func writePresets(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	os.WriteFile("presets.json", body, 0644)
	sendJSON(w, 200, Response{Status: true})
}

func main() {
	port := 3000
	var ln net.Listener
	var err error
	for {
		ln, err = net.Listen("tcp", fmt.Sprintf(":%d", port))
		if err == nil {
			break
		}
		fmt.Printf("Port %d is busy: %v\n", port, err)
		port++
		if port > 9999 {
			log.Fatal("No available port found (3000-9999)")
		}
	}

	http.HandleFunc("/proxy", proxyHandler)
	http.HandleFunc("/config", writeConfig)
	http.HandleFunc("/presets", writePresets)
	http.Handle("/", http.FileServer(http.Dir("./")))

	go func() {
		openBrowser(fmt.Sprintf("http://localhost:%d", port))
	}()

	log.Printf("Server running on :%d", port)
	log.Println("Don't close this console")
	log.Fatal(http.Serve(ln, nil))
}
