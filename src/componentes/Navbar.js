import React from 'react';
import style from '../css/navbar.module.css';
import Cart from '../componentes/utilitarios/Cart';

const Navbar = ({
  itensDoCarrinho,
  removeCart,
  cadaItem,
  maisQntdd,
  menosQntdd,
  carrinhoFormatado,
  filtrado,
  addCart,
  handleSearch,
  setFiltrado,
}) => {
  const [verCarrinho, setVerCarrinho] = React.useState(false);
  const [alterarAtivo, setAlterarAtivo] = React.useState(false);
  const [acc, setAcc] = React.useState(0);

  React.useEffect(() => {
    if (cadaItem > acc && !verCarrinho) {
      setAlterarAtivo(!alterarAtivo);
      setTimeout(() => {
        setAlterarAtivo(false);
      }, 500);
      setAcc(cadaItem);
    } else {
      setAcc(cadaItem);
    }
  }, [cadaItem]);

  function abrirCarrinho() {
    if (verCarrinho) return false;
    setVerCarrinho(!verCarrinho);
  }
  function fecharCarrinho() {
    setVerCarrinho(!verCarrinho);
  }
  return (
    <div className={style.navBg}>
      <div className={style.conteudo}>
        <div className={style.logo}>
          <h1>Front-end</h1>
          <p>Challenge</p>
        </div>
        <div className={style.layoutFlexNav}>
          <div className={style.searchBg}>
            <div className={style.searchConteudo}>
              <input
                type="text"
                placeholder="Pesquisar produto"
                onChange={(event) => handleSearch(event)}
                onClick={(event) => handleSearch(event)}
              />
              <span className={style.svg}></span>
            </div>
          </div>

          <div
            className={`${style.carrinho} ${alterarAtivo && style.ativo}`}
            onClick={abrirCarrinho}
          >
            <span className={style.svg}></span>
            <input
              readOnly
              disabled
              type="text"
              value={cadaItem ? cadaItem : 0}
            />
            <Cart
              itensDoCarrinho={itensDoCarrinho}
              carrinhoFormatado={carrinhoFormatado}
              verCarrinho={verCarrinho}
              fecharCarrinho={fecharCarrinho}
              removeCart={removeCart}
              maisQntdd={maisQntdd}
              menosQntdd={menosQntdd}
            />
          </div>
        </div>

        {filtrado.length > 0 && (
          <div className={style.produtoFiltradoBg}>
            <span
              className={style.cartBtnFechar}
              onClick={() => {
                setFiltrado([]);
              }}
            >
              X
            </span>
            {filtrado.length > 0 &&
              filtrado.map((produto) => (
                <div className={style.produtoFiltrado}>
                  <div className={style.layoutColumn1}>
                    <img src={produto.photo} alt={produto.name} />
                  </div>

                  <div className={style.layoutColumn2}>
                    <div className={style.layoutFlex}>
                      <h1 className={style.tituloFiltrado}>{produto.name}</h1>
                      <p className={style.precoFiltrado}>
                        R$ {Number(produto.price)}
                      </p>
                    </div>

                    <p className={style.descricaoFiltrado}>
                      {produto.description}
                    </p>
                  </div>
                  <div
                    className={style.addCart}
                    onClick={() => addCart(produto, produto.id)}
                  >
                    <span className={style.svg}></span>
                    <input
                      className={style.inputFiltrado}
                      value="Adicionar carrinho"
                      type="button"
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
