---
title: "(WIP) Concorrência e Paralelismo com Golang - Select"
date: 2025-03-08
draft: false # Set 'false' to publish
tableOfContents: true # Enable/disable Table of Contents
description: "Este artigo explora o uso de Select em Go para gerenciamento de múltiplos canais. Aprenda como usar Select, veja exemplos práticos e exercícios para reforçar o aprendizado."
categories:
- Programming
- Languages
- Go
tags:
- Programming
- Languages
- Go
---

## Select 🚀

![alt text](img/image-1.png)

O select é uma ferramenta poderosa para gerenciamento de múltiplos canais em Go, permitindo aguardar por operações de I/O e evitar bloqueios desnecessários. Compreender sua sintaxe, a importância do default e os comportamentos quando múltiplos cases estão prontos é fundamental para escrever um código concorrente robusto.

### O que é o select? 🤔
- O `select` permite uma goroutine aguardar por múltiplas operações de channel simultaneamente.
- Ele funciona de forma parecida com um `switch`, porém cada `case` envolve uma operação de envio ou recebimento em um channel.

### Sintaxe
- A estrutura básica do select é:
	```go
	select {
		case v := <-ch1:
			// código a ser executado quando houver um valor proveniente de ch1
		case ch2 <- 10:
			// código a ser executado quando for possível enviar o valor 10 para ch2
		default:
			// código opcional executado se nenhuma das operações acima estiver pronta
	}
	```
- Cada `case` tenta executar uma operação de channel.
- Se mais de um `case` estiver pronto, o `select` escolhe aleatoriamente um deles.
- Se nenhum `case` estiver pronto e houver um `default`, o `default` é executado imediatamente.
- Se não houver `default`, a goroutine bloqueia até que uma das operações possa ser realizada.

### Quando utilizar o select
- Para gerenciar timeout em operações de channel.
- Para sincronizar vários canais e tratar a primeira operação disponível.
- Para evitar bloqueios se nenhuma operação estiver pronta, usando default.

### Exemplo prático
Considere dois channels; queremos aguardar o recebimento de dados de qualquer um deles:
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	ch1 := make(chan string)
	ch2 := make(chan string)
	
	// Simulando envio de dados após tempos diferentes
	go func() {
		time.Sleep(500 * time.Millisecond)
		ch1 <- "Mensagem do canal 1"
	}()
	
	go func() {
		time.Sleep(300 * time.Millisecond)
		ch2 <- "Mensagem do canal 2"
	}()
	
	// O select espera até que um dos channels esteja pronto para enviar o dado
	select {
		case msg1 := <-ch1:
			fmt.Println("Recebido:", msg1)
		case msg2 := <-ch2:
			fmt.Println("Recebido:", msg2)
		default:
			fmt.Println("Nenhum canal estava pronto.")
	}
	
	// O programa pode aguardar um pouco para ver a execução completa
	time.Sleep(1 * time.Second)
}
```
Neste exemplo, devido ao tempo de `sleep`, o `case` do ch2 será acionado primeiro, mas o `default` executaria imediatamente se nenhum canal estivesse pronto.

## Uso do default
- O `default` é executado quando nenhuma outra operação de channel está pronta.
- Ele pode ser usado para evitar o bloqueio do select caso nenhuma operação esteja disponível.

## Exercícios com select

### Exercício 1 – Recebendo do primeiro canal disponível
- Requisito: Crie dois channels de string e lance duas goroutines que enviem mensagens para eles após tempos diferentes.
- Use select para imprimir a mensagem que chegar primeiro.

### Exercício 2 – Envio e default
- Requisito: Crie um channel de int sem rotina de recebimento.
- Utilize select com um case para enviar um valor e um default que imprima "Nenhum envio possível agora".
- Veja como o default evita o bloqueio.

### Exercício 3 – Time-out com select
- Requisito: Crie um channel de int e lance uma goroutine que não envie nenhum dado.
- No main, utilize select com um case para receber do channel e um default ou time.Sleep que simule um timeout, imprimindo "Timeout atingido".

### Exercício 4 – Alternância entre múltiplos canais
- Requisito: Crie três channels de string e lance goroutines que enviem mensagens para cada um, com sleep diferentes.
- Utilize select em um loop para receber as mensagens assim que estiverem disponíveis e imprima a mensagem e a identificação do canal.

### Exercício 5 – Combinação: select com waitgroup
- Requisito: Combine sync.WaitGroup e select.
- Lance duas goroutines, cada uma enviando um valor para um channel após um tempo diferente.
- No main, use select para capturar o primeiro valor recebido e, depois, aguarde pelo WaitGroup para sincronizar a finalização de ambas as goroutines.
- Imprima ambos os valores, mas destaque qual chegou primeiro via select.

## Erros mais comuns com select ⚠️

### Falha em incluir um default quando necessário
- **Erro:** Se nenhuma das operações de channel for imediatamente possível e não houver um default, o select bloqueia a goroutine indefinidamente.
- **Solução:** Use default para operações não bloqueantes, se for o caso.

### Supor ordem determinística
- **Erro:** Esperar que os cases do select sejam executados de uma ordem fixa.
- **Realidade:** Se mais de um case estiver pronto, o select escolhe aleatoriamente um deles.

### Não lidar com o fechamento de channels
- **Erro:** Tentar receber de um channel que já foi fechado sem verificar o valor “ok” pode levar a interpretações incorretas (o valor zero do tipo é retornado).
- **Solução:** Sempre verificar "valor, ok := <-ch" quando for relevante para o contexto.

### Usar o select inadequadamente em loops
- **Erro:** Colocar select dentro de loops sem controle pode levar a busy waiting (uso excessivo de CPU) se um default ou pausa não for implementado.
- **Solução:** Controlar os loops com condições adequadas ou utilizar time.Sleep para evitar consumo desnecessário da CPU.

### Misturar cases com operações bloqueantes e não bloqueantes
- **Erro:** Ter cases que enviam/recebem dados bloqueantes junto de cases default pode levar a comportamentos inesperados, onde o default é acionado imediatamente sem tentar as operações bloqueantes.
- **Atenção:** Entender a ordem de avaliação e o comportamento bloqueante dos channels.

## Solução dos exercícios
Pra não ter que ficar rodando manualmente cada exercício, eu usei testes e [exemplos testáveis](https://go.dev/blog/examples).
### Exercício 1:
```go
// main.go
// main_test.go
```


## Próximos passos!
Em seguida iremos abordar Mutex! [Clique aqui para a parte 4!](https://fcidade.com/posts/golang-concurrency-mutex/)

## Referências
- [Concorrência e Paralelismo - Fabio Akita](https://www.youtube.com/watch?v=cx1ULv4wYxM)
- [Go TDD - Concorrência](https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/concurrency)
- [Effective Go - Concorrência](https://go.dev/doc/effective_go#concurrency)
- [Go By Example](https://gobyexample.com/)