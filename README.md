# Dashboard luyện học từ mới toeic (Vuejs + Python)
## Project Structure
    ├── deployment                   // deploy với ansible, run api bằng docker
    ├── docker                       // run code dưới dạng container
    ├── src                          // run code dưới dạng container
    │   ├── be_eng                     // project backend api (python Flask)
    │   ├── fe_end                    // project frontend (Vuejs)
    │   ├── reminder                // gửi thông báo nhắc nhở qua telegram
## Các mành hình trong dashboard
#### Dashboard
* Hiển thị số từ vựng, quá trình học, tiến độ...
* Số ngày đăng nhập, số ngày bỏ lỡ
* Những lưu ý cần nhớ, từ vựng chưa nhớ...

| 1 | 2 | 
| --- | --- |
| ![Screenshot from 2020-09-24 11-11-19](https://user-images.githubusercontent.com/36092539/94100067-c3922980-fe56-11ea-8e98-468e2c710658.png) | ![Screenshot from 2020-09-24 11-13-39](https://user-images.githubusercontent.com/36092539/94100154-0a801f00-fe57-11ea-8eda-63413828dce6.png)|
#### Topic
* Từ vựng chia theo chủ đề. Hiện thị những từ mới thêm, từ khó lên ở cột bên phải
* Khi chọn một chủ đề sẽ hiển thị từ vựng ở dạng bảng có các chức năng để học như: chỉ hiển thị từ hoặc nghĩa, trộn lẫn, lọc những từ chưa có, thêm từ mới
* Chế độ luyện tập bằng hình thức chắc nhiệm 5 - 10p. Những từ sai sẽ tăng level và gửi qua telegram để nhắc nhở

| Các chủ đề | Chi tiết | Test trắc nghiệm |
| --- | --- | --- |
| ![Screenshot from 2020-09-24 11-20-28](https://user-images.githubusercontent.com/36092539/94100478-fc7ece00-fe57-11ea-8dd7-feb86125e473.png) | ![Screenshot from 2020-09-24 11-21-34](https://user-images.githubusercontent.com/36092539/94100553-2801b880-fe58-11ea-8dfc-ac237b744335.png)| ![Screenshot from 2020-09-24 11-24-48](https://user-images.githubusercontent.com/36092539/94100802-a8c0b480-fe58-11ea-9cb5-e31ec30b41c7.png)

#### Exam
* Lấy ngẫu nhiên các từ ở các chủ để thành bài kiểm tra 15p (Ưu tiên từ mới, level cao). Từ sai sẽ dc lưu lại gửi qua telegram
![Screenshot from 2020-09-24 11-26-57](https://user-images.githubusercontent.com/36092539/94100906-f4735e00-fe58-11ea-9851-ce2a4998682a.png)

## Build và deploy code
* Thay đổi thông tin tại file docker/.env (build 3 container: api, frontend, mongo)
* Chạy lệnh sau để build tại localhost:
```bash
set .env && docker-compose up -d --build
```
Deploy code lên host:
* Thay host tại file /deployment/hosts
* Chạy ansible để deploy + run container trên host:
```bash
ansible-playbook -i deployment/hosts deployment/site.yml -l dashboard -t dashboard -u {username}
```