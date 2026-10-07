# Hub Edu

MVP de um catálogo/launcher de mini-jogos educativos.

## O que já funciona

- Página inicial
- Catálogo
- Busca
- Filtro por matéria
- Filtro por dificuldade
- Página individual de jogo
- Biblioteca com `localStorage`
- Jogos recentes
- Abertura dos jogos em nova aba
- Layout responsivo
- Catálogo centralizado em `data/games.json`

## Rodar localmente

Como o projeto usa `fetch()` para ler o JSON, abra com um servidor local. Por exemplo:

```bash
python -m http.server 8000
```

Depois acesse:

`http://localhost:8000`

Não é recomendado abrir `index.html` diretamente com `file://`.

## Adicionar um jogo

Edite `data/games.json` e acrescente um objeto seguindo o mesmo formato dos jogos existentes.

Troque:

- `id`
- `nome`
- `descricao`
- `materia`
- `conteudo`
- `autor`
- `capa`
- `url`
- `dificuldade`
- `duracaoMin`
- `tags`
- `objetivos`

Antes de publicar, confirme que a URL do jogo funciona e que o conteúdo foi revisado.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta.
3. Em Settings → Pages, selecione a branch principal e a pasta `/root`.
4. Salve e aguarde o deploy.

## Importante

As URLs `https://example.com/` são apenas placeholders. Substitua-as pelas URLs reais dos jogos da equipe.

## Próximas melhorias

- Validação automática de `games.json`
- Página 404 personalizada
- Importar/exportar biblioteca
- Screenshots reais dos jogos
- Refinamento da identidade visual
