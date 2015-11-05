Kauris
=========

**Pré-requisitos**
 - Ubuntu com curl make e Docker:
 - Se estiver usando Windows ou MAC, recomendável usar VirtualBOX com Ubuntu e trabalhar dentro do virtualBOX usando Ubuntu.
```sh
sudo apt-get install curl make
sudo curl -sSL https://get.docker.com/ | sh
sudo usermod -aG docker ${USER}
```

**Sandbox para desenvolvimento**
 - Na primeira vez que o comando for executado, vai criar uma imagem no docker com todas as dependências. Esse processo pode levar vários minutos, se a conexão estiver ruim ou cair a conexão, será necessário executar o comando novamente.
 - Nas demais vezes, será feito um check apenas verificando a imagem já criada.
 - Esse comando já entrará dentro do container pronto para desenvolvimento com banco de dados configurado.
```sh
make run-dev
```
