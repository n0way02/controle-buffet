# Controle Buffet

Sistema para controle de aluguel de utensílios de buffet para festas.

## Tecnologias
- Backend: Java (Spring Boot) + Firebase Firestore
- Frontend: React + Firebase Authentication

## Funcionalidades
- Login com autenticação (Firebase)
- Cadastro e listagem de clientes
- Cadastro e listagem de itens/utensílios
- Verificação de itens alugados

## Como rodar

### Backend
1. Entre na pasta `backend`
2. Execute:
   ```
   mvn spring-boot:run
   ```

### Frontend
1. Entre na pasta `frontend`
2. Execute:
   ```
   npm install
   npm run dev
   ```

## Observações
- Não esqueça de configurar as credenciais do Firebase no backend e frontend (arquivos ignorados no Git).
- Não suba arquivos sensíveis como `serviceAccountKey.json` ou `firebaseConfig.js`.
