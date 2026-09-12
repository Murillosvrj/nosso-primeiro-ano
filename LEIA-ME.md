# 365 dias com você ♡

Uma caixa de memórias do primeiro ano de namoro, feita em HTML, CSS e JavaScript puro. Sem instalação, dependências de JavaScript, backend ou banco de dados.

## Comece por aqui

1. Extraia o ZIP inteiro. Mantenha todos os arquivos e pastas juntos.
2. As seis fotos e os três vídeos enviados já estão incluídos e conectados à página. Você pode abri-la diretamente.
3. Abra `index.html` em um editor de texto e substitua os campos entre colchetes: história, datas, carta e nome. Os comentários numerados identificam cada seção. Você também pode editar todas as frases, legendas e motivos de amor diretamente no HTML.
4. Cole o link de sua playlist no campo indicado no início de `script.js`.
5. Abra `index.html` no navegador para conferir. O Spotify precisa de internet e deve ser conferido também no link publicado.

Esta versão usa somente as seis fotos e os três vídeos enviados por você. Cada fotografia aparece uma única vez. Os arquivos originais foram preservados na pasta em que você os enviou; o site e o ZIP usam cópias com nomes simples. Os vídeos foram preparados para carregamento progressivo.

## Estrutura

```text
nosso-primeiro-ano/
├── index.html
├── style.css
├── script.js
├── .nojekyll
├── LEIA-ME.md
└── assets/
    ├── images/
    │   ├── COLOQUE-AS-FOTOS-AQUI.txt
    │   ├── laco-morango.png       ← ilustração original já incluída
    │   ├── foto01.jpg            ← já incluída
    │   ├── foto02.jpg
    │   ├── foto03.jpg
    │   ├── foto04.jpg
    │   ├── foto05.jpg
    │   └── foto06.jpg
    └── videos/
        ├── COLOQUE-OS-VIDEOS-AQUI.txt
        ├── video01.mp4           ← já incluído
        ├── video02.mp4
        ├── video03.mp4
        ├── video01.jpg           ← capa extraída do vídeo
        ├── video02.jpg
        └── video03.jpg
```

## Onde colocar cada foto

Os caminhos são relativos à pasta de `index.html`. Use os nomes exatamente em minúsculas.

| Arquivo no site | Arquivo original enviado | Onde aparece |
|---|---|---|
| `assets/images/foto01.jpg` | foto01.jpeg | Capa |
| `assets/images/foto02.jpg` | foto02.jpeg | Era só o começo... |
| `assets/images/foto03.jpg` | WhatsApp Image 2026-09-11 at 12.54.52 (1).jpeg | Galeria — nós do nosso jeito |
| `assets/images/foto04.jpg` | WhatsApp Image 2026-09-11 at 12.57.05.jpeg | Galeria — uma noite para guardar |
| `assets/images/foto05.jpg` | WhatsApp Image 2026-09-12 at 02.25.08.jpeg | Galeria — os nossos dias simples |
| `assets/images/foto06.jpg` | WhatsApp Image 2026-09-11 at 13.12.00.jpeg | 365 dias |

Há uma foto na capa, uma no começo da história, três na galeria e uma na seção “365 dias”. A timeline contém somente datas e textos. Os atributos `alt` descrevem as fotos reais.

As molduras usam a proporção original de cada foto, sem cortar os rostos. Para trocar uma fotografia, substitua seu arquivo e ajuste `width`, `height` e `--photo-ratio` no HTML para as novas dimensões.

Exporte realmente como JPEG: mudar a extensão de HEIC para `.jpg` não converte a fotografia. Para uma boa relação entre nitidez e carregamento, experimente 1.200–1.600 pixels no lado maior e ajuste a qualidade do JPEG. Preserve os arquivos originais separadamente.

As imagens usam `object-fit: cover` dentro de uma moldura com a mesma proporção, exibindo a imagem inteira. Se você mudar a proporção da moldura e precisar ajustar o foco, adicione àquela tag `<img>`:

```html
style="object-position: 50% 25%"
```

Para mostrar uma fotografia inteira dentro da moldura:

```html
style="object-fit: contain"
```

## Onde colocar cada vídeo

| Caminho | Original enviado | Card |
|---|---|---|
| `assets/videos/video01.mp4` | WhatsApp Video 2026-09-12 at 02.20.50.mp4 | Memória 01 |
| `assets/videos/video02.mp4` | WhatsApp Video 2026-09-12 at 02.22.14.mp4 | Memória 02 |
| `assets/videos/video03.mp4` | WhatsApp Video 2026-09-12 at 02.22.49.mp4 | Memória 03 |

Os três vídeos incluídos estão em MP4 com H.264 e AAC. Os dois primeiros foram preparados para carregamento progressivo sem alterar vídeo ou áudio; o terceiro foi compactado de aproximadamente 42 MB para 21 MB, preservando a duração completa de 4min06s e o áudio original. Todos os quadros foram mantidos. Os controles nativos permitem reprodução, pausa, volume e tela cheia conforme o navegador. As molduras acompanham a proporção vertical de cada vídeo, mostrando a imagem inteira. Cada card tem uma capa extraída do próprio vídeo. Não há autoplay de vídeo nem áudio; `preload="metadata"` solicita ao navegador apenas os metadados iniciais; o navegador pode carregar alguns dados adicionais. Ao iniciar um vídeo, os outros são pausados.

Você pode incluir legendas acessíveis em WebVTT: coloque o arquivo em `assets/videos` e adicione dentro do `<video>`, depois de `<source>`:

```html
<track kind="captions" src="assets/videos/video01.vtt" srclang="pt-BR" label="Português" default>
```

## Onde colocar a playlist

Abra `script.js`. Logo no começo, substitua apenas o conteúdo entre aspas:

```js
const SPOTIFY_PLAYLIST_URL = 'COLE_AQUI_O_LINK_DA_PLAYLIST_SPOTIFY';
```

Use o link de **Compartilhar → Copiar link da playlist** do Spotify. O código aceita o link normal, o link com `?si=...` e o link de incorporação. Precisa ser uma playlist de `open.spotify.com`; links encurtados, álbuns e faixas não são aceitos.

O código extrai o identificador, cria o Spotify Embed e configura o botão externo automaticamente. Não é necessário editar um iframe ou instalar um plugin. Use uma playlist disponível para quem receber o site. O Spotify pode limitar a reprodução de acordo com conta, região e regras do próprio serviço. [Como incorporar no Spotify](https://developer.spotify.com/documentation/embeds/tutorials/creating-an-embed).

## Personalizar a história

- **Introdução:** procure `[ESCREVER AQUI COMO NOSSA HISTÓRIA COMEÇOU]`.
- **Datas:** procure `[DATA` e substitua cada campo.
- **Carta:** procure `[ESCREVA AQUI SUA CARTA DE 1 ANO DE NAMORO]`. Use um `<p>...</p>` por parágrafo; a carta cresce com o texto.
- **Assinatura:** substitua `[SEU NOME]`.
- **Timeline, legendas e bilhetes:** edite o texto diretamente em `index.html`. Remova ou adapte qualquer evento que não corresponda à história de vocês.
- **Surpresas:** os três botões têm o atributo `data-secret` com a mensagem editável.
- **Cores:** estão nas variáveis no início de `style.css`.

Os três bilhetes estão no coração ao lado do título, no coração da galeria e no cartão “Seu abraço”. Podem ser ativados por toque, mouse ou teclado. A tecla Escape fecha o aviso. O final tem cinco corações, apenas uma vez. A preferência do aparelho por movimento reduzido é respeitada.

## Publicar gratuitamente

Escolha uma das opções abaixo. Publique a pasta que contém diretamente `index.html`, `style.css`, `script.js` e `assets`. Não envie o ZIP fechado como se fosse o site.

### Opção simples: Netlify

1. Entre em uma conta gratuita e abra [Netlify Drop](https://app.netlify.com/drop).
2. Arraste a pasta extraída que contém `index.html` para a área de envio.
3. Conclua a publicação no painel e copie o endereço gerado para compartilhar.
4. Para atualizar, arraste a pasta completa atualizada na área de envio de **Deploys**.

O plano Free está sujeito a créditos de uso; vídeos maiores e muitos acessos consomem mais transferência. Consulte os limites atuais no painel. [Publicação manual](https://docs.netlify.com/deploy/create-deploys/), [plano gratuito](https://www.netlify.com/pricing/).

### GitHub Pages

1. Crie um repositório público na sua conta GitHub.
2. Envie o conteúdo da pasta, mantendo `index.html` na raiz do repositório. Inclua o arquivo vazio `.nojekyll`.
3. Abra **Settings → Pages → Build and deployment**.
4. Em **Source**, escolha **Deploy from a branch**; selecione **main**, **/(root)** e **Save**.
5. Aguarde a publicação e abra **Visit site**. Copie esse link.

O GitHub Free oferece Pages em repositórios públicos. Pelo navegador, cada arquivo enviado pode ter até 25 MiB. Arquivos acima de 100 MiB são bloqueados em repositórios comuns; reduza os vídeos antes de enviá-los. [Instruções oficiais](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [limites de arquivos](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github).

### Vercel

1. Envie os arquivos para um repositório de sua conta pessoal do GitHub.
2. Na Vercel, escolha **New Project** e importe o repositório.
3. Selecione **Framework Preset: Other** e a pasta que contém `index.html` como **Root Directory**.
4. Em **Build Command**, ative **Override** e deixe o campo vazio. Use **Output Directory: `.`**.
5. Clique em **Deploy** e copie o link gerado.

O plano Hobby é gratuito para uso pessoal e não comercial. [Importar pelo Git](https://vercel.com/docs/git), [configurar sem build](https://vercel.com/docs/builds/configure-a-build#skip-build-step), [plano Hobby](https://vercel.com/docs/plans/hobby).

## Antes de mandar o link

Abra a versão publicada no celular: confira as seis fotos, os três vídeos, a carta, as datas e a playlist. O site público e suas mídias ficam acessíveis a quem tiver o endereço. Envie a surpresa depois de substituir os campos pessoais.

Os serviços externos e suas condições podem mudar. Instruções consultadas em 12/09/2026.
