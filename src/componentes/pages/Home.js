import React from 'react';
import Navbar from '../Navbar';
import Produtos from '../Produtos';

const Home = () => {
  const [produtos, setProdutos] = React.useState(false);
  const [itensDoCarrinho, setItensDoCarrinho] = React.useState([]);
  const [cadaItem, setCadaItem] = React.useState(false);
  const [filtrado, setFiltrado] = React.useState([]);

  function addCart(produto, idDoProduto) {
    const verifItemJaNoCart = itensDoCarrinho.find(
      (item) => item.id === idDoProduto,
    );
    if (verifItemJaNoCart) {
      const incrementoDoItem = {
        idDoProduto: verifItemJaNoCart.id,
        amount: verifItemJaNoCart.amount + 1,
        estoque: '',
      };
      atualizarAmount(incrementoDoItem);
    } else {
      const novoProdutoNoCarrinho = { ...produto, amount: 1 };
      setItensDoCarrinho([...itensDoCarrinho, novoProdutoNoCarrinho]);
      incrementarCarrinho();
    }
  }

  function removeCart(idDoProduto) {
    const verifProdutoExiste = itensDoCarrinho.some(
      (item) => item.id === idDoProduto,
    );
    if (verifProdutoExiste) {
      const deletarProduto = itensDoCarrinho.filter(
        (item) => item.id !== idDoProduto,
      );
      setItensDoCarrinho(deletarProduto);
      decrementarCarrinho();
    } else throw new Error('Erro na remoção do produto');
  }

  function incrementarCarrinho() {
    setCadaItem(cadaItem + 1);
  }
  function decrementarCarrinho() {
    setCadaItem(cadaItem - 1);
  }

  function maisQntdd(produto) {
    const incrementoDoItem = {
      idDoProduto: produto.id,
      amount: produto.amount + 1,
      estoque: '',
    };
    atualizarAmount(incrementoDoItem);
  }

  function menosQntdd(produto) {
    const decrimentoDoItem = {
      idDoProduto: produto.id,
      amount: produto.amount - 1,
      estoque: '',
    };
    atualizarAmount(decrimentoDoItem);
  }

  function atualizarAmount({ idDoProduto, amount, estoque }) {
    const verifProdutoExiste = itensDoCarrinho.some(
      (produto) => produto.id === idDoProduto,
    );
    if (verifProdutoExiste) {
      const accesStockDoProduto = stock.find((item) => item.id === idDoProduto);
      const quantiaDoStockDoProduto = accesStockDoProduto.amount;

      const novoCarrinho = itensDoCarrinho.map((produto) => {
        let quantidadeDeProduto = { ...produto };

        if (produto.id === idDoProduto) {
          if (amount <= quantiaDoStockDoProduto && amount >= 1) {
            quantidadeDeProduto = {
              ...produto,
              amount: amount,
              estoque: estoque,
            };
          } else if (produto.estoque) {
            quantidadeDeProduto = {
              ...produto,
              estoque: '',
            };
          } else {
            quantidadeDeProduto = {
              ...produto,
              estoque: 'Estoque máximo selecionado.',
            };
          }
        }

        return quantidadeDeProduto;
      });
      setItensDoCarrinho(novoCarrinho);
    }
  }

  function handleSearch(event) {
    let searching = event.target.value.toLowerCase();
    let searchResult = [];
    searchResult = produtos.filter((produto) => {
      return produto.name.toLowerCase().search(searching) != -1;
    });
    if (searching) setFiltrado(searchResult);
    else {
      setFiltrado([]);
    }
    console.log(filtrado);
  }
  const carrinhoFormatado = itensDoCarrinho.map((produto) => ({
    id: produto.id,
    name: produto.name,
    photo: produto.photo,
    price: produto.price,
    amount: produto.amount,
    estoque: produto.estoque,
    subTotal: produto.amount * produto.price,
  }));

  const stock = [
    {
      id: 1,
      amount: 3,
    },
    {
      id: 2,
      amount: 5,
    },
    {
      id: 3,
      amount: 2,
    },
    {
      id: 4,
      amount: 2,
    },
    {
      id: 5,
      amount: 5,
    },
    {
      id: 6,
      amount: 10,
    },
    {
      id: 7,
      amount: 9,
    },
    {
      id: 8,
      amount: 7,
    },
  ];

  React.useEffect(() => {
    fetch(
      'https://mks-challenge-api-frontend.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC',
    )
      .then((resp) => resp.json())
      .then((data) => setProdutos(data.products));
  }, []);
  return (
    <>
      <Navbar
        itensDoCarrinho={itensDoCarrinho}
        cadaItem={cadaItem}
        removeCart={removeCart}
        maisQntdd={maisQntdd}
        menosQntdd={menosQntdd}
        carrinhoFormatado={carrinhoFormatado}
        filtrado={filtrado}
        addCart={addCart}
        handleSearch={handleSearch}
        setFiltrado={setFiltrado}
      />
      <Produtos produtos={produtos} addCart={addCart} />
    </>
  );
};

export default Home;
