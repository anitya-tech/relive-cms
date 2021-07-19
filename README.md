# Relive CMS

https://cms.relive.1453.tv

## Network

`cms.relive.1453.tv` cname => `AliyunCDN` origin => `home.endpoints.geektr.co:10080` nat => `swarm.geektr.co:80` port bining => `konga gateway` => `cms service`

## Docker

`anityatech/relive-cms`

[Docker Hub](https://hub.docker.com/r/anityatech/relive-cms/)

```bash
yarn docker:build
yarn docker:push

# Run in development environment
docker run -it -v $HOME/.vault-token:/root/.vault-token -p 1337:1337 -e NODE_ENV=development --rm anityatech/relive-cms

# Hack production environment
docker run -it -v $HOME/.vault-token:/root/.vault-token -p 1337:1337 --rm anityatech/relive-cms
```

## Links

- [Konga](https://konga.geektr.co/#!/services/b1a74b56-ea3a-4fd0-bbc9-f69998c8b2a4/read)
- [Aliyun CDN](https://cdnnext.console.aliyun.com/domain/detail/cms.relive.1453.tv/basic)
- [Portainer](https://portainer.geektr.co/#!/2/docker/stacks/relive-cms?id=104&type=1&regular=true)
