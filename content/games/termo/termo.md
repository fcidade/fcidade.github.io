---
title: "Termo / Wordle"
date: 2025-03-07
draft: true
description: "Tentativa de recriar o Termo/Wordle"
categories:
  - Games
tags:
  - Games
---
<div id="placeholders" style="display: flex">
</div>


<script>
    const placeholdersEl = document.getElementById('placeholders')
    console.log(placeholdersEl)

    placeholdersEl.innerHTML = Array.from({length: 5}).fill(0).map(() => `
        <div 
            style="border: solid 1px black; width: 50px; height: 50px; text-align: center"
        >_</div>
    `).join('')


    let gameWord = "ratos"

    const guessWord = (word) => {
        if ((typeof word !== "string") || word.length != 5) {
            console.error("Invalid word size")
            return
        }

        const correctLetters = []
        const correctLetterPositions = {}
        for (let i = 0; i < word.length; i++) {
            const char = word[i]
            if (!gameWord.includes(char)) {
                continue
            }
            correctLetters.push(char)

            if (gameWord[i] == char) {
                correctLetterPositions[i] = char
            }
        }
        
        return {
            correctLetters,
            correctLetterPositions,
        }
    }
</script>