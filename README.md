# CP4-WebDev
# Passa a Bola - Cadastro de Jogadoras de Futebol Feminino

## Descrição do Projeto  

O **Passa a Bola** é um projeto esportivo com o objetivo de facilitar a prática de futebol para mulheres, oferecendo um espaço e um grupo para jogar, o objetivo do projeto é criar uma pagina onde possa ver o nome e a estatística das jogadoras, tendo como principal objetivo **cadastrar, listar e gerenciar jogadoras de futebol feminino**, permitindo que o usuário explore informações, marque favoritas e organize a visualização.  

Os dados são salvos no **LocalStorage do navegador**, garantindo persistência mesmo após fechar a página.  

## Estrutura do Projeto  

O sistema contém uma pagina única, dividida em seções:  

* **Cabeçalho** — título e identidade do projeto.  
* **Controles** — campo de busca, filtro por clube e botões de ordenação.  
* **Formulário** — utilizado para adicionar e editar jogadoras.  
* **Cards de Jogadoras** — exibem as informações em formato estilo “carta FIFA”.  
* **Rodapé (footer)** — informações de direitos autorais e redes sociais do projeto.  

## Funcionalidades  

- **CRUD completo** (Create, Read, Update, Delete) de jogadoras.  
- **Salvar dados no LocalStorage** na primeira execução.  
- **Cards responsivos** com nome, posição, clube, foto e estatísticas.  
- **Favoritar** jogadoras com ícone de estrela.  
- **Busca** por nome ou posição.  
- **Filtro** por clube.  
- **Ordenação** por nome ou posição.  

## Efeitos Visuais  

O site utiliza CSS, com foco em simplicidade e responsividade:  

### Pseudo-classes  
- `:hover` — aplicado em botões e ícones para destacar interações.  
- `:focus` — usado em campos de formulário para indicar o campo ativo.  

### Transições e Transformações  
- Transições suaves em botões e nos ícones.  
- Uso de `transform: scale()` em efeitos de hover para dar destaque.  

### Layout Responsivo  
- Uso de **Flexbox** e **Grid** para organizar cards e formulários.  
- Ajuste automático para telas menores (mobile).  

## Integrantes
* João Victor  