# README

## Overview

アルコール計算機です。飲酒量とアルコール量について下記の計算ができます。

1. 飲酒量からアルコール量を計算する
2. アルコール量から飲める量を計算する
3. あとどれくらい飲めるか計算する
4. 飲酒量とアルコール量のメモをとる

This is an alcohol calculator.  
The following calculations can be made for the amount of alcohol consumed and the amount of alcohol consumed.

1. calculate the amount of alcohol from the amount of alcohol consumed
2. calculate the amount of alcohol you can drink from the amount of alcohol you have consumed
3. calculate how much more you can drink
4. take a note of the amount of alcohol consumed and the amount of alcohol consumed

## Example

### ![example1.png](/public/image/example1.png "example1.png")

## Features

- Next.js
- Tailwind CSS

## Creation Date

2024/8/16 - 2024/8/18

## Log

- [作成ログ](./MakeLog.md)

## Purpose of creation

1. 肝臓を大事にするべくアルコール量に気を付けたい。
2. 飲んだアルコール飲料のアルコール量を計算したい。
3. 制限アルコール量まで、あとどれくらい飲めるか知りたい。

## Other

1. 純アルコール量計算式は厚生省のウェブサイトを参考に下記で計算しました。  
   摂取量(ml) × アルコール濃度（度数/100）× 0.8（アルコールの比重）
2. アルコール度数と容量の選択肢は市販品を参考に下記に設定しました。  
   アルコール度数：4～9％　　選択肢：350ml or 500ml　　　　備考：ビール、チューハイ、ハイボールを想定  
   アルコール度数：12％以上　選択肢：20ml刻みで20ml～200ml　備考：ワイン、焼酎、テキーラを想定
3. 疾病とリスクについては厚生省のウェブサイトを参考にしました。
