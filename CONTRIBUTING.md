# Contribuindo com o CATAUlogo

Este documento define um padrão simples para registrar alterações no CATAUlogo e manter o histórico do Git claro e fácil de consultar.

## Padrão de commits

Use o formato:

```text
tipo: descrição curta, no imperativo
```

Escreva a descrição em português, comece com letra minúscula e evite ponto final. Prefira mensagens específicas que expliquem o que mudou.

### Tipos recomendados

| Tipo | Quando usar | Exemplo |
| --- | --- | --- |
| `feat` | Adicionar uma funcionalidade | `feat: adiciona filtros ao catálogo` |
| `fix` | Corrigir um erro | `fix: corrige transbordamento da seção Sobre` |
| `style` | Alterar apresentação visual sem mudar comportamento | `style: padroniza cores dos títulos` |
| `refactor` | Reorganizar o código sem mudar o comportamento esperado | `refactor: centraliza configuração do tema` |
| `perf` | Melhorar desempenho | `perf: reduz carregamento das imagens` |
| `docs` | Alterar documentação | `docs: atualiza instruções do projeto` |
| `test` | Adicionar ou ajustar testes | `test: cobre filtros do catálogo` |
| `chore` | Manutenção, ferramentas ou configurações | `chore: atualiza dependências` |

## Como agrupar alterações

- Faça um commit por objetivo coerente, não necessariamente por arquivo.
- Agrupe alterações que fazem parte da mesma tarefa e funcionam em conjunto.
- Separe funcionalidades, correções e ajustes visuais independentes.
- Evite commits vagos como `ajustes`, `mudanças` ou `atualizações`.
- Atualizações de cache geradas pelo processo de desenvolvimento devem, quando possível, acompanhar a alteração que as exige, em vez de virar commits isolados repetidos.
- Antes de finalizar, confira os arquivos alterados e verifique se não incluiu credenciais, dados privados ou arquivos gerados desnecessários.

## Exemplos para o CATAUlogo

```text
feat: adiciona navegação entre as seções
feat: adiciona controles globais de cor
fix: corrige transbordamento horizontal da seção Sobre
style: alinha títulos ao contêiner principal
refactor: centraliza configuração da identidade visual
docs: documenta padrão de commits
```

Use `style` apenas quando a mudança for visual. Se ela introduzir ou alterar uma funcionalidade, prefira `feat` ou `fix`, conforme o caso.

## Fluxo recomendado

1. Atualize sua cópia local com a branch principal.
2. Crie uma branch para a tarefa, com um nome descritivo, por exemplo `feat/filtros-catalogo` ou `fix/alinhamento-titulos`.
3. Faça alterações pequenas e relacionadas.
4. Revise o diff e teste o que foi modificado.
5. Crie commits seguindo o padrão acima.
6. Envie a branch e abra um pull request para `main), descrevendo o objetivo, as mudanças e os testes realizados.
7. Integre o pull request depois da revisão e das verificações necessárias.

## Histórico existente

Os commits anteriores do projeto são preservados. Este padrão passa a orientar os novos commits; reescrever o histórico já publicado só deve ser considerado quando houver uma necessidade concreta e um plano para evitar problemas com outros clones e colaboradores.
