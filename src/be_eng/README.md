# Backend dashboard (Python Flask)
## Project Structure
    ├── deployment                   // deploy với ansible, run api bằng docker
    ├── src                          // main source code
    │   ├── db                      // các truy vẫn mongodb
    │   ├── main                    // api cho frontend
    │   ├── settings                // câu hình db
    │   ├── utils                   // funtion cho main.py
    ├── nginx.conf                  // cấu hình nginx cho api
    └── requirements.json           // những thư viện cần thiết cho api