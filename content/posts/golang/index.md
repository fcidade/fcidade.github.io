---
title: "Colinha Golang"
date: 2025-03-05T10:05:00-03:00
draft: true # Set 'false' to publish
tableOfContents: true # Enable/disable Table of Contents
description: "Uma colinha (cheatsheet) da linguagem Golang, para servir de referência rápida."
categories:
  - Programming
  - Languages
  - Go
tags:
  - Programming
  - Languages
  - Go
---

## References

- [Learn X in Y Minutes - Go](https://learnxinyminutes.com/docs/go)
- [Devhints - Go](https://devhints.io/go)

---

## Todo

- Padrões de nomenclatura snake_case

---

## Hello World

Criando e executando um arquivo Go:
- Crie um arquivo com a extensão ".go", por exemplo: `meu_programa.go`

Criando um novo módulo em Go:
- Explicação que é o normal
```sh
go mod init nome_do_seu_modulo
go mod init github.com/seu_user/nome_do_seu_modulo
```

Cabeçalho do arquivo:
- Todo arquivo precisa ter o nome do pacote ao qual ele pertence no começo do arquivo
```go
package nome_do_pacote
```

O arquivo que você pretende executar precisa ser do pacote `main`:
```go
package main

import "fmt"

func main() {
  fmt.Println("Hello World")
}
```

---

## Comentários

```go
// Comentário em uma linha
/*
  Comentário
  em
  várias
  linhas
*/
```