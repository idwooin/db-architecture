백엔드 설정

1. docker desktop 필요
2. git bash 열고 winpty docker-compose up -d 로 컨테이너, 볼륨 생성
3. winpty docker exec -it dbarch-api sh => npx sequelize-cli db:seed:all (시드 데이터 넣기)
4. localhost:3001 접속

프론트 설정
0. 터미널 창에 npm i 입력
0-1. 터미널 창에 npm i nunjucks 입력
1. 터미널 창에 npm run dev 입력
2. localhost:3000 접속


완료