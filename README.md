<h1 style="text-align:center;">Khóa luận tốt nghiệp</h1>
<h1 style="text-align:center;">Xây dựng hệ thống CRM cho doanh nghiệp trên nền tảng Java</h1>
<h3>
    <ul style="display:flex;flex-direction:column;gap:12px;">
        <li>Giảng viên hướng dẫn: Thầy Võ Văn Thành</li>
        <li>Sinh viên 1: Trần Trương Gia Phát - 52000853</li>
        <li>Sinh viên 2: Nguyễn Thuận Phát - 52000699</li>
    </ul>
</h3>
<hr>
<h2> Hướng dẫn cài đặt và chạy mã nguồn </h2>

<h3>
    1. Yêu cầu hệ thống
<h3>
<ul style="display:flex;flex-direction:column;gap:12px;">
    <li>Java: Java từ phiên bản 17 trở lên</li>
    <li>Angular: Angular từ phiên bản 17.0.0 trở lên</li>
    <li>Nodejs: Nodejs từ phiên bản 18.0.0 trở lên</li>
    <li>MySQL: Sử dụng MySQL Workbench phiên bản 8.0.0</li>
</ul>

<h3>
    2. Cài đặt hệ thống
<h3>
<ul style="display:flex;flex-direction:column;gap:12px;">
    <li>Java: Tải xuống từ trang chủ Oracle</li>
    <li>Angular: Tải xuống từ trang chủ Angular</li>
    <li>Nodejs: Tải xuống từ trang chủ của node</li>
    <li>MySQL: Tải xuống từ trang chủ của MySQL</li>
    <li>Zipkin: Tải xuống từ trang chủ của Zipkin</li>
    <li>Kafka: Tải xuống từ trang chủ của Kafka</li>
    <li>Axonserver: Tải xuống từ trang chủ của Axonserver</li>
</ul>

<h3>
    3. Vận hành hệ thống
<h3>
<p style="margin-left:16px;">3.1 Axon server</p>
<ul style="display:flex;flex-direction:column;gap:12px;">
    <li>Bước 1: Vào thư mục chứa Axon server</li>
    <li>Bước 2: Mở Terminal cho thư mục này</li>
    <li>Bước 3: Chạy lệnh <code>java -jar axonserver.java</code></li>
</ul>
<p style="margin-left:16px;">3.2 Zipkin</p>
<ul style="display:flex;flex-direction:column;gap:12px;">
    <li>Bước 1: Vào thư mục chứa Zipkin</li>
    <li>Bước 2: Mở Terminal cho thư mục này</li>
    <li>Bước 3: Chạy lệnh <code>java -jar zipkin.jar</code></li>
</ul>
<p style="margin-left:16px;">3.3 Kafka</p>
<ul style="display:flex;flex-direction:column;gap:12px;">
    <li>Bước 1: Vào thư mục chứa Zipkin</li>
    <li>Bước 2: Mở Terminal cho thư mục này</li>
    <li>Bước 3: Chạy các lệnh sau:</li>
    <ul style="display:flex;flex-direction:column;gap:12px;">
        <li><code>kafka-topics.bat --create --topic crm --bootstrap-server localhost:9092</code></li>
        <li><code>kafka-topics.bat --list --bootstrap-server localhost:9092</code></li>
        <li><code>zookeeper-server-start.bat C:\kafka_2.13-3.2.0\config\zookeeper.properties</code></li>
        <li><code>kafka-server-start.bat C:\kafka_2.13-3.2.0\config\server.properties
</code></li>
    </ul>
</ul>
<p style="margin-left:16px;">3.4 Front-end</p>
<ul style="display:flex;flex-direction:column;gap:12px;">
    <li>Bước 1: Vào thư mục front-end. Nếu chưa có thư mục thì sử dụng lệnh <code>git clone &lt;tên repository&gt;</code></li>
    <li>Bước 2: Mở Terminal cho thư mục này</li>
    <li>Bước 3: Nếu có file node module nên xóa đi</li>
    <li>Bước 3: Chạy lệnh <code>npm install --legacy-peer-deps</code> để cài lại các thư viện và tránh xung đột giữa các thư viện</li>
    <li>Bước 4: Chạy lệnh <code>ng serve</code> . Nếu thành công, chúng ta sẽ nhận được thông báo là http://localhost:4200/</li>
</ul>

<p style="margin-left:16px;">3.5 Database</p>
<ul style="display:flex;flex-direction:column;gap:12px;">
    <li>Bước 1: Cấu hình thông số MySQL cho phù hợp: </li>
    <ul style="display:flex;flex-direction:column;gap:12px;">
        <li>username: root</li>
        <li>password: </li>
        <li>port: 3306 </li>
    </ul>
    <li>Bước 2: Khởi tạo các database bằng cách chạy các câu lệnh sau:</li>
    <ul style="display:flex;flex-direction:column;gap:12px;">
        <code>
            <li style="list-style:none;">CREATE SCHEMA `userservicedb`;</li>
            <li style="list-style:none;">CREATE SCHEMA `ticketservicedb`;</li>
            <li style="list-style:none;">CREATE SCHEMA `leadservicedb`;</li>
            <li style="list-style:none;">CREATE SCHEMA `quoteservicedb`;</li>
            <li style="list-style:none;">CREATE SCHEMA `activityservicedb`;</li>
            <li style="list-style:none;">CREATE SCHEMA `productservicedb`;</li>
            <li style="list-style:none;">CREATE SCHEMA `personservicedb`;</li>
            <li style="list-style:none;">CREATE SCHEMA `contactservicedb`;</li>
            <li style="list-style:none;">CREATE SCHEMA `notificationservicedb`;</li>
        </code>
    </ul>
    <li>Bước 3: Kiểm tra các database đã tạo thành công hay chưa</li>
</ul>

<p style="margin-left:16px;">3.6 Back-end</p>
<ul style="display:flex;flex-direction:column;gap:12px;">
    <li>Bước 1: Vào thư mục back-end. Nếu chưa có thư mục thì sử dụng lệnh <code>git clone &lt;tên repository&gt;</code></li>
    <li>Bước 2: Mở Terminal cho thư mục này</li>
    <li>Bước 3: Sử dụng vscode + extension spring boot để chạy source code</li>
    <li>Bước 4: Do cấu trúc microservice, nên chúng ta sẽ chạy từng springboot application đang có trong source.</li>
    <strong><span style="text-decoration: underline">Lưu ý:</span> Chúng ta sẽ phải ưu tiên chạy các services này trước</strong>
    <ul style="display:flex;flex-direction:column;gap:12px;">
        <li>discoveryserver</li>
        <li>commonservice</li>
        <li>apigateway</li>
    </ul>
    <strong>Những services chỉ cần nhấn nút chạy là được</strong>
</ul>

<p style="margin-left:16px;">3.7 Mobile</p>
<ul style="display:flex;flex-direction:column;gap:12px;">
    <li>Bước 1: Vào thư mục mobile. Nếu chưa có thư mục thì sử dụng lệnh <code>git clone &lt;tên repository&gt;</code></li>
    <li>Bước 2: Mở Terminal cho thư mục này</li>
    <li>Bước 3: Nếu có file node module nên xóa đi</li>
    <li>Bước 3: Sử dụng câu lệnh <code>yarn install</code></li>
    <li>Bước 4: Sử dụng ngrok để cho có thể public port 9012</li>
    <li>Bước 5: Thay thế link của ngrok vào file config để chạy</li>
    <li>Bước 6: Sử dụng câu lệnh <code>yarn start</code> để chạy hệ thống</li>
    <li>Bước 7: Sử dụng điện thoại để quét mã QR thông qua phần mềm ExpoGo để mở app</li>
</ul>
<hr>
<h3>Sau khi thực hiện các thao tác trên sẽ sử dụng được hệ thống CRM.</h3>