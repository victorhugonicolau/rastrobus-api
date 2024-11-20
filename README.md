# RastroBus - API

## Gerando imnagem docker da aplicação

Antes de começar, esse projeto foi concebido pelos alunos do 3H3 e, para isso, fizeram uso do usuário no `hub.docker.com`. As instruções que seguem consideram que você tem posse desse usuário e senha. Caso não seja o seu caso, pode ter que ajustar os comandos docker utilizados para usar as credenciais corretas.

Ajuste o seu arquivo .env:

```
DB_HOST=<endereço do seu servidor remoto>
DB_USER=<usuario do seu banco>
DB_PASSWORD=<senha do banco de dados>
DB_NAME=<nome do banco>
SERVICE_PORT=8080
```

Gere a imagem para uso local:

> [!IMPORTANT]  
> Para essa etapa, e as próximas que seguem, funcionar você precisa estar com ambiente configurado para uso do docker.

```shell
docker build -t rastrobus-api .
```

Caso queira rodar imagem recem gerada, pode usar o comando:

```shell
docker run --name rastrobus-api -p 3000:8080 -d rastrobus-api
```

Com esse comando você poderá fazer acesso à porta 3000 do seu ambiente e consumir a api normalmente.

Pronto, agora, para subir a imagem no docker, vamos à sequência:

Faça login no docker:

```shell
docker login -u victor.nicolau4002@gmail.com
```

Agora gere uma tag da sua imagem:

```shell
docker image tag rastrobus-api rastrobus/api
```

Por fim, envie sua imagem para o `hub.docker.com` com o seguinte comando:

```shell
docker image push rastrobus/api
```

Pronto, sua imagem, na versão latest, foi atualizada no `hub.docker.com`

