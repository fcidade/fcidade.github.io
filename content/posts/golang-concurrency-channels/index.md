---
title: "Concorrência e Paralelismo com Golang - Channels"
date: 2025-03-07T10:05:00-03:00
draft: false # Set 'false' to publish
tableOfContents: true # Enable/disable Table of Contents
description: "Este artigo explora o uso de Channels em Go para comunicação e sincronização entre goroutines. Aprenda como usar Channels, veja exemplos práticos e exercícios para reforçar o aprendizado."
categories:
  - Programming
  - Languages
  - Go
tags:
  - Programming
  - Languages
  - Go
---

## Channels 🚀

<img src="https://preview.redd.it/pixel-animation-of-a-little-factory-v0-v7hxxqyv6k1a1.gif?width=685&auto=webp&s=aa4852e31d9bfc7d6c1bf419b66a7542ea5dd462"/>

### O que são Channels? 🤔
<div style="display: flex; justify-content: space-between">
<div>
Channels são estruturas que permitem a comunicação e a sincronização entre goroutines. Funcionam como "tubos" pelos quais dados podem ser enviados de uma parte do código para outra. Permitem transferir dados de forma segura, sem acessar diretamente variáveis compartilhadas.
</div>

<img style="margin-left: 16px" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8ba27d68-276c-4df3-a555-b66e081da02d/dfjusr7-a4f78037-59f6-45e2-a3b3-fec2e2d32fca.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhiYTI3ZDY4LTI3NmMtNGRmMy1hNTU1LWI2NmUwODFkYTAyZFwvZGZqdXNyNy1hNGY3ODAzNy01OWY2LTQ1ZTItYTNiMy1mZWMyZTJkMzJmY2EuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.g1DDca8L0X87I14HqIuja7avPwnRkRsOyAihc-zpDOw" width="250"/>
</div>

### Por que usá-los?
- Removem a necessidade de estruturas de sincronização complexas para a comunicação.
- Ajudam a evitar condições de corrida (race conditions) quando bem empregados.

## Declaração e Criação de Channels
Você pode declarar um channel com a sintaxe:
```go
var ch chan int
```
Isso define um channel de inteiros, mas ainda não o inicializa.

Em Go, quando você define um canal (channel) de inteiros, você está apenas declarando a existência desse canal, mas ainda não está criando uma instância dele. Para realmente inicializar o canal e torná-lo utilizável, você precisa usar a função make.

Para criar (inicializar) um channel, utilize a função `make`:
```go
ch := make(chan int)
```
Isso cria um channel não-bufferizado que pode ser usado para enviar e receber valores do tipo int.

## Operações Básicas com Channels
### Envio de dados
Utilize a sintaxe:
```go
ch <- valor
```
Isso envia “valor” para o channel, bloqueando a execução da goroutine se não houver uma goroutine receptora (no caso de channel não-bufferizado).

### Recebimento de dados
Utilize a sintaxe:
```go
valor := <-ch
```
Isso aguarda e recebe um valor do channel. Se não houver um valor disponível, a goroutine fica bloqueada até que um valor seja enviado.

### Exemplo Simples
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// Cria e inicializa o channel.
	ch := make(chan int)
	
	// Lança uma goroutine para enviar um valor.
	go func() {
		ch <- 42
	}()
	
	// Recebe e imprime o valor enviado.
	valor := <-ch
	fmt.Println("Recebido:", valor)
}
```

Perceba que não foi necessário um `sync.WaitGroup` nem um `time.Sleep` aqui, pois o uso de channels em Go permite a sincronização direta entre goroutines. 

No exemplo, a goroutine anônima envia o valor 42 para o channel `ch`, e a função main aguarda a recepção desse valor antes de continuar a execução.

Isso ocorre porque a operação de envio (`ch <- 42`) bloqueia a goroutine até que outro goroutine receba o valor, e a operação de recepção (`<-ch`) bloqueia a função main até que um valor seja enviado.

Dessa forma, o channel garante que a comunicação e sincronização entre as goroutines aconteçam de maneira eficiente e sem a necessidade de mecanismos adicionais de sincronização.

## Channels Não-Bufferizados vs. Bufferizados
Em Go existem dois tipos de canais, e um deles a gente já utilizou anteriormente. Vamos nos aprofundar no que tem de diferença entre eles.

### Channel não-bufferizado
- Exige que a operação de envio e recebimento ocorram simultaneamente.
- A goroutine que envia fica bloqueada até que outra goroutine esteja pronta para receber.
- Exemplo: `ch := make(chan int)` (sem especificar tamanho).

### Channel bufferizado
- Permite que um número limitado de valores seja armazenado sem bloquear imediatamente o envio.
- O buffer é definido como o segundo parâmetro da função `make`.
- Exemplo: `ch := make(chan int, 5)` cria um channel que pode armazenar até 5 inteiros antes de bloquear o envio.

### Demonstração
Imagine que você tem um channel bufferizado e envia três valores seguidos:
```go
ch := make(chan int, 3)
ch <- 10
ch <- 20
ch <- 30
```
Nessa situação, as três operações de envio não bloqueiam, pois há espaço suficiente no buffer. Se você tentar enviar um quarto valor, a operação ficará bloqueada até que algum valor seja recebido.

## Fechamento de Channels
### Quando fechar um channel
Você deve fechar um channel quando não há mais valores a serem enviados. Isso informa aos receptores que nenhuma outra informação será enviada.

### Como fechar
Use a função `close`:
```go
close(ch) // ch é o nome da variável onde seu channel está armazenado
```

### Recebimento após fechamento
Ao tentar receber de um channel fechado, a operação retornará o valor zero do tipo, além de um flag “ok” que indica se o channel está aberto.
Exemplo:
```go
valor, ok := <-ch
if !ok {
	fmt.Println("Channel fechado, nenhuma leitura disponível")
}
// Caso `ch` seja um channel de inteiros, a variável `valor` será `0`, 
// em uma string será "", etc...
```

## Iterando sobre Channels
Assim como os maps, arrays e slices, também é possível iterar os valores de um channel.

### Uso do loop for...range
Permite iterar sobre os valores enviados em um channel até que ele seja fechado.
Exemplo:
```go
for v := range ch {
	fmt.Println("Valor recebido:", v)
}
```

### Exemplo prático completo
```go
package main

import (
	"fmt"
)

func main() {
	ch := make(chan int, 5)
	// Lança uma goroutine que envia dados e fecha o channel.
	go func() {
		for i := 1; i <= 5; i++ {
			ch <- i
		}
		close(ch)
	}()
	// O loop for...range continua enquanto o channel estiver aberto.
	for valor := range ch {
		fmt.Println("Recebido:", valor)
	}
}
```

## Considerações e Cuidados com Channels
### Prevenção de deadlocks
- Certifique-se de que para cada envio haja um receptor, principalmente com channels não-bufferizados.
- Ao usar channels bufferizados, evite encher o buffer sem esvaziá-lo, pois isso pode levar ao bloqueio da goroutine que envia.

### Fechamento adequado
- Somente o produtor (quem envia dados) deve fechar o channel.
- Evite fechar o channel de dentro de uma goroutine que também está lendo dele, pois pode causar um `panic` se outro produtor tentar enviar.

### Boas práticas
- Sempre teste o comportamento do seu código concorrente para identificar e resolver possíveis bloqueios.
- Utilize `valor, ok := <-ch` para verificar se o channel foi fechado e tratar a condição apropriadamente.

## Exercícios 📝

1. **Envio Simples com Channel Não-Bufferizado**
	- Requisito: Crie um channel de inteiros, lance uma goroutine que envie o valor 100 para o channel e, no main, receba e imprima esse valor.

1. **Envio e Recebimento com Channel Bufferizado**
	- Requisito: Crie um channel bufferizado (capacidade 3), envie três valores seguidos sem causar bloqueio e, em seguida, receba e imprima todos os valores no main.

1. **Fechamento de Channel com Iteração**
	- Requisito: Lance uma goroutine que envie os números de 1 a 5 para um channel, feche o channel e, no main, itere com um loop for...range para imprimir todos os valores recebidos.

1. **Verificação de Channel Fechado**
	- Requisito: Crie um channel, envie um valor, feche-o e, em seguida, no main, use a recepção com `valor, ok := <-ch` para imprimir o valor e indicar se o channel ainda está aberto.

1. **Combinação: Goroutine e Channel para Cálculo**
	- Requisito: Lance uma goroutine que compute a soma dos números de 1 a 5 e envie o resultado por um channel; no main, receba e imprima o resultado.

1. **Combinação: WaitGroup e Channel**
	- Requisito: Lance 2 goroutines que realizem operações simples (por exemplo, uma soma e uma multiplicação) e enviem os resultados por um channel; utilize `sync.WaitGroup` para sincronizar as goroutines e, após sua conclusão, no main receba e imprima os resultados.
	- Desafio Bônus: Consegue resolver esse exercício sem usar WaitGroups?

1. **Exemplo Completo: Várias Goroutines com WaitGroup e Channel**
	- Requisito: Crie uma função que lance 5 goroutines, cada uma enviando seu identificador (de 1 a 5) para um channel; use um `WaitGroup` para aguardar que todas terminem e, após isso, itere no main (utilizando `for...range`) para imprimir todos os valores do channel. Lembre-se de fechar o channel após a finalização das goroutines.
	- Desafio Bônus: Consegue resolver esse exercício sem usar WaitGroups?

## Erros Comuns com Channels ⚠️
<img style="margin-bottom: 16px" src="https://i.pinimg.com/originals/e7/94/59/e79459869cf388308d256e28dfed7014.gif" alt="alt text" width="100%"/>


### Operações Bloqueantes em Channels Não-bufferizados
- **Erro:** Tentar enviar um valor para um channel não-bufferizado sem que haja uma goroutine receptora causando bloqueio (deadlock).
- **Solução:** Garantir que haja uma goroutine preparada para receber o valor ou usar um channel bufferizado quando adequado.

### Esquecer de Fechar um Channel
- **Erro:** Não fechar um channel quando o produtor termina de enviar valores pode levar a loops infinitos (por exemplo, em um `for…range`), pois o receptor ficará aguardando novos valores.
- **Cuidados:** Apenas o produtor deve fechar o channel e sempre fechar após o envio final.

### Tentativa de Enviar Dados em um Channel Fechado
- **Erro:** Enviar valores em um channel que já foi fechado gera um pânico, fazendo com que o programa pare de funcionar.
- **Atenção:** Feche o channel apenas quando tiver certeza de que nenhum outro envio ocorrerá.

## Solução dos exercícios
Pra não ter que ficar rodando manualmente cada exercício, eu usei testes e [exemplos testáveis](https://go.dev/blog/examples).

### Exercício 1:
```go
// main.go
func Ex1() {
	ch := make(chan int)
	go func() {
		ch <- 100
	}()
	fmt.Println(<-ch)
}

// main_test.go
func ExampleEx1() {
	Ex1()
	// output: 100
}
```

### Exercício 2:
```go
// main.go
func Ex2() {
	ch := make(chan string, 3)
	go func() {
		ch <- "um"
		ch <- "dois"
		ch <- "três"
	}()
	fmt.Println(<-ch)
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}

// main_test.go
func ExampleEx2() {
	Ex2()
	// output:
	// um
	// dois
	// três
}
```

### Exercício 3:
```go
// main.go
func Ex3() {
	ch := make(chan int)
	go func() {
		for i := 1; i <= 5; i++ {
			ch <- i
		}
		close(ch)
	}()

	for v := range ch {
		fmt.Println(v)
	}
}

// main_test.go
func ExampleEx3() {
	Ex3()
	// output:
	// 1
	// 2
	// 3
	// 4
	// 5
}
```

### Exercício 4:
```go
// main.go
func Ex4() {
	ch := make(chan float64)
	go func() {
		ch <- 10.0
		close(ch)
	}()

	if v, ok := <-ch; ok {
		fmt.Printf("%.1f", v)
	}
}

// main_test.go
func ExampleEx4() {
	Ex4()
	// output:
	// 10.0
}
```

### Exercício 5:
```go
// main.go
func Ex5() {
	ch := make(chan int)
	go func() {
		n := 5
		sum := (n * (n + 1)) / 2
		ch <- sum
		close(ch)
	}()

	fmt.Println("Soma:", <-ch)
}

// main_test.go
func ExampleEx5() {
	Ex5()
	// output:
	// Soma: 15
}
```

### Exercício 6:
```go
// main.go
func Ex6() {
	ch := make(chan int, 2)

	wg := &sync.WaitGroup{}

	wg.Add(1)
	go func() {
		defer wg.Done()
		ch <- 20 + 5
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		ch <- 10 * 10
	}()

	wg.Wait()

	fmt.Println("Primeiro:", <-ch)
	fmt.Println("Segundo:", <-ch)
}

// main_test.go
func ExampleEx6() {
	Ex6()
	// output:
	// Primeiro: 100
	// Segundo: 25
}
```

### Exercício 7:
```go
// main.go
func Ex7() {
	const repeticoes = 5
	ch := make(chan int, repeticoes)

	wg := &sync.WaitGroup{}

	wg.Add(repeticoes)
	for i := range repeticoes {
		go func(i int) {
			defer wg.Done()
			ch <- i + 1
		}(i)
	}

	wg.Wait()
	close(ch)

	for i := range ch {
		fmt.Println("Goroutine:", i)
	}
}

// main_test.go
func TestEx7(t *testing.T) {
	out := captureOutput(Ex7)
	expectedOutputs := []string{
		"Goroutine: 1",
		"Goroutine: 2",
		"Goroutine: 3",
		"Goroutine: 4",
		"Goroutine: 5",
	}
	for _, expected := range expectedOutputs {
		if !strings.Contains(out, expected) {
			t.Fatal("Output not generated: ", expected, " got: ", out)
		}
	}
}

// main_test.go
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


## Próximos passos!
Em seguida iremos abordar Select Statements! Fique atento para os próximos dias!

## Referências
- [Concorrência e Paralelismo - Fabio Akita](https://www.youtube.com/watch?v=cx1ULv4wYxM)
- [Go TDD - Concorrência](https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/concurrency)
- [Effective Go - Concorrência](https://go.dev/doc/effective_go#concurrency)
- [Go By Example - Channels](https://gobyexample.com/channels)