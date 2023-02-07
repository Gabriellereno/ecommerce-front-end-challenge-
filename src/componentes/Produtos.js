import React from 'react';
import style from '../css/produtos.module.css';

const Produtos = ({ produtos, addCart, handleSearch, filtrado }) => {
  return (
    <div className={style.produtosBg}>
      <div className={style.produtosContainer}>
        {produtos &&
          produtos.map((produto) => {
            return (
              <div className={style.produto} key={produto.id}>
                <img src={produto.photo} alt={produto.name} />
                <h1 className={style.titulo}>{produto.name}</h1>
                <p className={style.preco}>R$ {Number(produto.price)}</p>
                <p className={style.descricao}>{produto.description}</p>
                <div
                  className={style.comprar}
                  onClick={() => addCart(produto, produto.id)}
                >
                  <span className={style.svg}></span>
                  <input
                    className={style.input}
                    value="Comprar"
                    type="button"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Produtos;
