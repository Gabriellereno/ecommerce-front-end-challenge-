import React from 'react';
import style from '../../css/utilitarios/cart.module.css';
import Aviso from './Aviso';

const Cart = ({
  itensDoCarrinho,
  carrinhoFormatado,
  verCarrinho,
  fecharCarrinho,
  removeCart,
  menosQntdd,
  maisQntdd,
}) => {
  return (
    <>
      {verCarrinho && (
        <div className={style.cartBg}>
          <div className={style.cartContainer}>
            <div className={style.cartIntroducao}>
              <div>
                <h1 className={style.cartTitulo}>
                  Carrinho <br /> de compras
                </h1>
              </div>

              <div>
                <span className={style.cartBtnFechar} onClick={fecharCarrinho}>
                  X
                </span>
              </div>
            </div>

            <div className={style.cartProdutos}>
              {carrinhoFormatado &&
                carrinhoFormatado.map((produto, key) => (
                  <div className={style.cartProduto} key={key}>
                    <img
                      className={style.cartImg}
                      src={produto.photo}
                      alt={produto.name}
                    />
                    <h1 className={style.cartProdutoTitulo}>{produto.name}</h1>
                    <div className={style.cartQntdd}>
                      <p>Qtd</p>
                      <div className={style.cartBtn}>
                        <button
                          disabled={produto.amount <= 1}
                          onClick={() => menosQntdd(produto)}
                        >
                          <span>-</span>
                        </button>
                        <input readOnly disabled value={produto.amount} />
                        <button onClick={() => maisQntdd(produto)}>
                          <span>+</span>
                        </button>
                      </div>
                    </div>
                    <p className={style.cartProdutoValor}>
                      R${Number(produto.price)}
                    </p>
                    <div
                      className={style.cartRemoverProduto}
                      onClick={() => removeCart(produto.id)}
                    >
                      <span>X</span>
                    </div>

                    {produto.estoque && (
                      <Aviso className={style.erro} value={produto} />
                    )}
                  </div>
                ))}
            </div>

            <div className={style.cartCheckout}>
              <p className={style.cartTotal}>Total:</p>
              <p className={style.cartValorTotal}>
                R$
                {carrinhoFormatado &&
                  carrinhoFormatado.reduce((acc, next) => {
                    return (acc += Number(next.subTotal));
                  }, 0)}
              </p>
            </div>
            {carrinhoFormatado.length > 0 ? (
              <input
                className={style.cartFinalizar}
                type="button"
                value="Finalizar compra"
              />
            ) : (
              <input
                className={style.cartVazio}
                type="button"
                value="Carrinho vazio"
                disabled
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
