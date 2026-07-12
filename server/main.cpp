#include <string>
#include <iostream>
#include <filesystem>
#include <fstream>

#define CPPHTTPLIB_OPENSSL_SUPPORT

#include "httplib.h"

namespace fs = std::filesystem;

#ifdef _WIN32
    #include <windows.h>
    #include <shellapi.h>
#else
    #include <cstdlib>
#endif

void open_browser(const std::string& url) {
#ifdef _WIN32
    ShellExecuteA(0, "open", url.c_str(), 0, 0, SW_SHOW);
#elif __APPLE__
    // macOS
    system(("open " + url).c_str());
#else
    // Linux и остальные
    system(("xdg-open " + url).c_str());
#endif
}

bool writeConfig(std::string configStr){
    std::ofstream config("config.json");
    config << configStr;
    return true;
}
bool writePresets(std::string presetsStr){
    std::ofstream presets("presets.json");
    presets << presetsStr;
    return true;
}

int main(){

	httplib::Server srv;
    
	srv.set_mount_point("/", "./");
    
    srv.Post("/config", [](const httplib::Request& req, httplib::Response& res){
        std::string body = req.body;
        bool status = writeConfig(body);
        if(!status){
            std::cout << "Something went wrong on " << __LINE__ << std::endl;
        }
        res.set_content("{\"status\": true}", "application/json");
    });

    srv.Post("/presets", [](const httplib::Request& req, httplib::Response& res){
        std::string body = req.body;
        bool status = writePresets(body);
        if(!status){
            std::cout << "Something went wrong on " << __LINE__ << std::endl;
        }
        res.set_content("{\"status\": true}", "application/json");
    });
    
    int startPort = 3000;
    while(!srv.bind_to_port("localhost", startPort)){
        startPort++;
        if(startPort > 9999){
            std::cout << "Something went wrong: no empty port " << __LINE__ << std::endl;
            system("pause");
            return 1;
        }
    }

	open_browser("http://localhost:"+std::to_string(startPort));
	std::cout << "App opened in browser" << std::endl << "Dont close this console" << std::endl;

	srv.listen_after_bind();

	return 0;
}