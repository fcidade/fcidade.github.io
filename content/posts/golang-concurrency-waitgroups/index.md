---
title: "Concorrência e Paralelismo com Golang - Wait Groups"
date: 2025-03-07T10:05:00-03:00
draft: false # Set 'false' to publish
tableOfContents: true # Enable/disable Table of Contents
description: "Este artigo explora o uso de Wait Groups em Go para sincronizar a execução de múltiplas goroutines. Aprenda como usar Wait Groups, veja exemplos práticos e exercícios para reforçar o aprendizado."
categories:
  - Programming
  - Languages
  - Go
tags:
  - Programming
  - Languages
  - Go
---

## Wait Groups 🚀
![alt text](img/image-1.png)

### O que é sync.WaitGroup? 🤔
WaitGroup é uma estrutura do pacote "sync" que permite sincronizar a execução de múltiplas goroutines. Ele funciona contando quantas goroutines ainda não terminaram sua execução, bloqueando o main até que o contador seja zero.

### Como usar WaitGroup?
- Declare uma variável do tipo `sync.WaitGroup`.
- Antes de iniciar uma goroutine que deve ser sincronizada, chame `wg.Add(1)` para incrementar o contador.
- Dentro da goroutine, quando o trabalho estiver concluído, chame `wg.Done()` para decrementar o contador.
- No final do main (ou onde for necessário aguardar), chame `wg.Wait()` para esperar que todas as goroutines terminem.

Exemplo:

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	wg := sync.WaitGroup{}
	wg.Add(1)  // Informa que teremos uma goroutine a ser sincronizada

	go func() {
		defer wg.Done() // Garante que o wg.Done() será chamado quando a goroutine terminar
		fmt.Println("Olá, WaitGroup!")
	}()

	// Aguarda todas as goroutines terminarem
	wg.Wait()
}
```

Note que sync.WaitGroup não possui um construtor. 
Isso ocorre porque a estrutura WaitGroup é inicializada com seus valores zero, 
que já são válidos para uso. Portanto, você pode simplesmente declarar uma 
variável do tipo sync.WaitGroup e começar a usá-la imediatamente.

### Usando WaitGroup com múltiplas goroutines em um loop
Exemplo de 5 goroutines:

```go
package main

import (
		"fmt"
		"sync"
)

func main() {
		var wg sync.WaitGroup
		
		// Adiciona 5 antes de iniciar o loop
		for i := 1; i <= 5; i++ {
				wg.Add(1)
				go func(n int) {
						defer wg.Done()
						fmt.Printf("Goroutine %d executando\n", n)
				}(i)
		}
		
		// Aguarda que todas as goroutines terminem
		wg.Wait()
}
```

### Uso com funções que simulam tarefas demoradas
Você pode criar funções que realizam tarefas (como um `time.Sleep`) e sincronizá-las com o WaitGroup.

Exemplo:

```go
package main

import (
		"fmt"
		"sync"
		"time"
)

// Função que simula um trabalho demorado
func trabalhoDemorado(wg *sync.WaitGroup) {
		defer wg.Done()  // Informa que esta goroutine terminou sua execução
		fmt.Println("Iniciando trabalho demorado")
		time.Sleep(2 * time.Second)
		fmt.Println("Trabalho demorado finalizado")
}

func main() {
		var wg sync.WaitGroup
		wg.Add(1)
		
		go trabalhoDemorado(&wg)
		
		// O main aguarda o término do trabalhoDemorado
		wg.Wait()
}
```

### Cuidados e pontos importantes
- Sempre chame `wg.Add()` antes de iniciar a goroutine que você pretende sincronizar.
- Certifique-se de que cada goroutine chame `wg.Done()` para indicar que ela terminou.
- Utilize `defer wg.Done()` logo no início da função da goroutine para evitar esquecimentos, mesmo se ocorrerem erros ou retornos antecipados.

## Exercícios 📝

1. Lance uma única goroutine que imprima "Olá, WaitGroup!".
	 - Utilize `sync.WaitGroup` para controlar a execução.
	 - Certifique-se de chamar `wg.Done()` ao final da goroutine e `wg.Wait()` no main.

1. Lance 5 goroutines utilizando um loop for.
	 - Cada goroutine deve imprimir uma mensagem identificando seu número (por exemplo, "Goroutine 1", "Goroutine 2", etc.).

1. Crie um programa que contenha uma função chamada `trabalhoDemorado`, que:
	 - Imprima "Iniciando trabalho demorado",
	 - Realize um `time.Sleep` para simular uma operação que leva 2 segundos,
	 - Em seguida, imprima "Trabalho demorado finalizado".
	 - Lance essa função em uma goroutine controlada por um WaitGroup e garanta que o main aguarde a conclusão antes de encerrar.

1. Crie um programa que lance duas goroutines paralelas:
	 - A primeira goroutine deverá, em um loop de 1 a 5, imprimir "Número: X" (onde X é o número atual) e realizar um `time.Sleep` curto (por exemplo, 200ms) entre as iterações.
	 - A segunda goroutine deverá, também em um loop de 1 a 5, imprimir "Letra: A, B, C, …" (você pode definir uma sequência fixa ou utilizar um array de letras) com um `time.Sleep` semelhante entre as iterações.

## Erros Comuns com WaitGroup ⚠️
<div style="display: flex; justify-content: center">
	<img src="img/image-2.png" alt="alt text">
</div>

### Esquecer de chamar wg.Add() antes de iniciar uma goroutine
- Erro: Se não indicar ao wait group que haverá uma nova goroutine, a chamada ao `wg.Wait()` no main poderá retornar imediatamente, mesmo com goroutines em execução.
- Dica: Sempre realizar `wg.Add(1)` (ou a quantidade necessária) antes de iniciar a goroutine correspondente.

### Não chamar wg.Done() ao final da execução de uma goroutine
- Erro: Se uma goroutine não indicar que finalizou sua execução chamando `wg.Done()`, o `wg.Wait()` no main irá esperar indefinidamente, causando um deadlock.
- Dica: Certifique-se de colocar `wg.Done()` ao final da função executada ou utilize `defer wg.Done()` logo no início da goroutine.

### Passagem incorreta da referência do WaitGroup
- Erro: Em alguns casos, sem passar o WaitGroup como ponteiro, as goroutines podem trabalhar com cópias do wait group, fazendo com que as chamadas a `wg.Add()`, `wg.Done()` e `wg.Wait()` não se comuniquem corretamente.
- Dica: Sempre passe a referência do wait group (por exemplo, `*sync.WaitGroup`) se estiver utilizando funções que o recebem como argumento.

### Chamar wg.Add() dentro da goroutine
- Erro: Pode ocorrer de chamar `wg.Add()` ou modificar o wait group depois que as goroutines já estão rodando, o que pode gerar condições inesperadas ou dificultar o controle da sincronização.
- Dica: A chamada a `wg.Add()` deve ser feita antes de iniciar a goroutine que depende desse incremento.

## Solução dos exercícios
Pra não ter que ficar rodando manualmente cada exercício, eu usei testes e [exemplos testáveis](https://go.dev/blog/examples).
### Exercício 1:
```go
// main.go
func Ex1() {
	// Cria uma instância de WaitGroup.
	wg := sync.WaitGroup{}

	// Adiciona um contador ao WaitGroup.
	wg.Add(1)

	// Inicia uma nova goroutine.
	go func(wg *sync.WaitGroup) {
		// Garante que Done será chamado quando a goroutine terminar.
		defer wg.Done()
		// Imprime uma mensagem.
		fmt.Println("Olá, WaitGroup!")
	}(&wg) // Passa o ponteiro do WaitGroup para a goroutine.

	// Aguarda até que o contador do WaitGroup seja zero.
	wg.Wait()
}


// main_test.go
func ExampleEx1() {
	Ex1()
	// output: Olá, WaitGroup!
}
```

### Exercício 2:
```go
// main.go
func Ex2() {
	wg := sync.WaitGroup{}

	for i := range 5 {
		// Atenção! Não esqueça de chamar o wg.Add(1) p/ cada iteração do for
		// OU use um wg.Add(5) antes do for!
		wg.Add(1)
		go func(wg *sync.WaitGroup, i int) {
			defer wg.Done()
			fmt.Println("Goroutine", i)
		}(&wg, i)

		wg.Wait()
	}
}


// main_test.go
func TestEx2(t *testing.T) {
	out := captureOutput(Ex2)
	expectedOutputs := []string{
		"Goroutine 0",
		"Goroutine 1",
		"Goroutine 2",
		"Goroutine 3",
		"Goroutine 4",
	}
	for _, expected := range expectedOutputs {
		if !strings.Contains(out, expected) {
			t.Fatal("Output not generated: ", expected, " got: ", out)
		}
	}
}

func captureOutput(f func()) string {
	orig := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	f()
	os.Stdout = orig
	w.Close()
	out, _ := io.ReadAll(r)
	return string(out)
}

```

### Exercício 3:
```go
// main.go

func trabalhoDemorado(wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Println("Iniciando trabalho demorado")
	time.Sleep(2 * time.Second)
	fmt.Println("Trabalho demorado finalizado")
}

func Ex3() {
	wg := sync.WaitGroup{}

	wg.Add(1)
	go trabalhoDemorado(&wg)

	wg.Wait()
}


// main_test.go
func ExampleEx3() {
	Ex3()
	// output:
	// Iniciando trabalho demorado
	// Trabalho demorado finalizado
}
```

### Exercício 4:
```go
// main.go
func Ex4() {
	wg := &sync.WaitGroup{}

	alphabet := "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

	wg.Add(1)
	go func(wg *sync.WaitGroup) {
		defer wg.Done()
		for i := range 5 {
			fmt.Printf("Número: %d\n", i)
			time.Sleep(200 * time.Millisecond)
		}
	}(wg)

	wg.Add(1)
	go func(wg *sync.WaitGroup) {
		defer wg.Done()
		for i := range 5 {
			fmt.Printf("Letra: %s\n", string(alphabet[i]))
			time.Sleep(200 * time.Millisecond)
		}
	}(wg)

	wg.Wait()
}

// main_test.go
func TestEx4(t *testing.T) {
	out := captureOutput(Ex4)
	expectedOutputs := []string{
		"Número: 0",
		"Número: 1",
		"Número: 2",
		"Número: 3",
		"Número: 4",
		"Letra: A",
		"Letra: B",
		"Letra: C",
		"Letra: D",
		"Letra: E",
	}
	for _, expected := range expectedOutputs {
		if !strings.Contains(out, expected) {
			t.Fatal("Output not generated: ", expected, " got: ", out)
		}
	}
}
```


## Próximos passos!
Em seguida iremos abordar Channels! Fique atento para os próximos dias!

## Referências
- [Concorrência e Paralelismo - Fabio Akita](https://www.youtube.com/watch?v=cx1ULv4wYxM)
- [Go TDD - Concorrência](https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/concurrency)
- [Effective Go - Concorrência](https://go.dev/doc/effective_go#concurrency)
- [Go By Example - WaitGroups](https://gobyexample.com/waitgroups)