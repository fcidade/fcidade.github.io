---
title: "TODO"
date: 2025-03-08
draft: true # Set 'false' to publish
tableOfContents: true # Enable/disable Table of Contents
description: "TODO"
categories:
- Programming
- Languages
- Python
tags:
- Programming
- Languages
- Python
---
Este guia é para analistas de dados familiarizados com SQL que querem aprender Python. Python é uma linguagem de programação de alto nível, amplamente utilizada na análise de dados, conhecida por sua simplicidade e legibilidade. Ao longo deste guia, exploraremos os comandos e conceitos essenciais da linguagem.


## Comentários no Python
No Python, os comentários são utilizados para documentar o código, tornando-o mais legível e compreensível. Eles podem ser de duas formas:

Comentários de uma linha: Começam com o símbolo #. Tudo o que for escrito após esse símbolo é ignorado pelo interpretador Python.

```python
# Este é um comentário de uma linha
```
Comentários com mais de uma linha: Usam três aspas duplas ou simples, geralmente para documentar funções ou módulos inteiros.

```python
"""
Este é um comentário
que pode se estender por várias linhas.
"""
```

Tipos de Dados Primitivos e Operadores
O Python oferece diversos tipos de dados primitivos, como números, strings, booleanos e o tipo especial None. Vamos analisar alguns desses tipos e seus operadores.

Números e Operações Matemáticas
Em Python, a aritmética funciona de maneira intuitiva:
```python
1 + 1   # Soma => 2
8 - 1   # Subtração => 7
10 * 2  # Multiplicação => 20
35 / 5  # Divisão => 7.0
```

Python também oferece operações de divisão especial, como a divisão inteira (com //) e o módulo (%):

python
Copiar

5 // 3   # Divisão inteira => 1
7 % 3    # Módulo => 1

O operador exponenciação é feito com **:

python
Copiar

2 ** 3  # Exponenciação => 8

Booleanos e Operadores Lógicos
Os valores booleanos em Python são representados por True e False. Podemos utilizá-los com operadores lógicos:

python
Copiar

True and False   # => False
True or False    # => True
not True         # => False

Os operadores de comparação, como ==, !=, >, <, >=, <=, comparam valores, e o Python também permite a comparação encadeada de forma simples:

python
Copiar


1 < 2 < 3  # => True

Strings e Formatação
As strings em Python podem ser criadas com aspas simples ou duplas, e podem ser manipuladas de várias maneiras:

python
Copiar

# Concatenando strings
"Hello " + "World!"  # => "Hello World!"

Além disso, Python 3.6 introduziu as f-strings para facilitar a interpolação de variáveis dentro de strings:

python
Copiar

name = "Reiko"
f"She said her name is {name}."  # => "She said her name is Reiko"

None
O None é um tipo especial que representa a ausência de valor:

python
Copiar
None  # => None

Note que para comparações com None, é preferível usar is ao invés de ==:

python
Copiar

"etc" is None  # => False
None is None   # => True

Variáveis e Coleções
Em Python, as variáveis são criadas apenas com a atribuição, sem a necessidade de declarações explícitas. Além disso, existem diversas coleções úteis como listas, tuplas, dicionários e conjuntos.

Listas
As listas são sequências mutáveis que podem armazenar diferentes tipos de elementos:

python
Copiar

li = [1, 2, 3]
li.append(4)  # Adiciona um item no final
li.pop()      # Remove o último item

Você pode acessar elementos de uma lista usando índices e também utilizar fatiamento (slicing) para manipular sublistas:

python
Copiar

li[0]   # => 1
li[1:3] # => [2, 3]

Tuplas
As tuplas são semelhantes às listas, mas imutáveis. Isso significa que, uma vez criadas, seus elementos não podem ser alterados:

python
Copiar

tup = (1, 2, 3)
tup[0]  # => 1

Dicionários
Os dicionários armazenam pares de chave-valor. Eles são úteis para mapear um valor para uma chave única:

python
Copiar

filled_dict = {"one": 1, "two": 2}
filled_dict["three"] = 3  # Adiciona um novo par chave-valor

Conjuntos
Conjuntos são coleções não ordenadas de elementos únicos. Eles são úteis quando se precisa de operações matemáticas de conjunto, como união, interseção e diferença:

python
Copiar

s = {1, 2, 3}
s.add(4)  # Adiciona um elemento
s.remove(2)  # Remove um elemento

Controle de Fluxo
O controle de fluxo em Python é realizado por meio de estruturas condicionais (if, elif, else) e loops (for, while).

Condicionais
As estruturas condicionais permitem que o código execute diferentes blocos dependendo de uma condição:

python
Copiar

if x > 10:
    print("x é maior que 10")
elif x < 10:
    print("x é menor que 10")
else:
    print("x é igual a 10")

Laços de Repetição
O Python oferece a instrução for para iterar sobre coleções e a instrução while para executar um bloco de código enquanto uma condição for verdadeira.

python
Copiar

for i in range(4):
    print(i)  # Imprime 0, 1, 2, 3

Funções
Em Python, as funções são definidas com a palavra-chave def e podem receber argumentos posicionais e nomeados:

python
Copiar

def add(x, y):
    return x + y

add(5, 3)  # => 8

Além disso, funções podem ter número variável de argumentos utilizando *args (argumentos posicionais) e **kwargs (argumentos nomeados):

python
Copiar

def varargs(*args):
    return args

def keyword_args(**kwargs):
    return kwargs
