import React from 'react';

export default function NewArrivals() {
  return (
    <section className="new-arrivals-products-area bg-gray section-padding-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Section Heading */}
            <div className="section-heading text-center">
              <h2>NEW ARRIVALS</h2>
              <p>We have the latest products, it must be exciting for you</p>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Single Product Area */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div
              className="single-product-area mb-50 wow fadeInUp"
              data-wow-delay="100ms"
            >
              {/* Product Image */}
              <div className="product-img">
                <a href="shop-details.html">
                  <img src="/img/bg-img/9.jpg" alt="" />
                </a>
                {/* Product Tag */}
                <div className="product-tag">
                  <a href="#">Hot</a>
                </div>
                <div className="product-meta d-flex">
                  <a href="#" className="wishlist-btn">
                    <i className="icon_heart_alt"></i>
                  </a>
                  <a href="cart.html" className="add-to-cart-btn">
                    Add to cart
                  </a>
                  <a href="#" className="compare-btn">
                    <i className="arrow_left-right_alt"></i>
                  </a>
                </div>
              </div>
              {/* Product Info */}
              <div className="product-info mt-15 text-center">
                <a href="shop-details.html">
                  <p>Cactus Flower</p>
                </a>
                <h6>$10.99</h6>
              </div>
            </div>
          </div>

          {/* Single Product Area */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div
              className="single-product-area mb-50 wow fadeInUp"
              data-wow-delay="200ms"
            >
              {/* Product Image */}
              <div className="product-img">
                <a href="shop-details.html">
                  <img src="/img/bg-img/10.jpg" alt="" />
                </a>
                <div className="product-meta d-flex">
                  <a href="#" className="wishlist-btn">
                    <i className="icon_heart_alt"></i>
                  </a>
                  <a href="cart.html" className="add-to-cart-btn">
                    Add to cart
                  </a>
                  <a href="#" className="compare-btn">
                    <i className="arrow_left-right_alt"></i>
                  </a>
                </div>
              </div>
              {/* Product Info */}
              <div className="product-info mt-15 text-center">
                <a href="shop-details.html">
                  <p>Cactus Flower</p>
                </a>
                <h6>$10.99</h6>
              </div>
            </div>
          </div>

          {/* Single Product Area */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div
              className="single-product-area mb-50 wow fadeInUp"
              data-wow-delay="300ms"
            >
              {/* Product Image */}
              <div className="product-img">
                <a href="shop-details.html">
                  <img src="/img/bg-img/11.jpg" alt="" />
                </a>
                <div className="product-meta d-flex">
                  <a href="#" className="wishlist-btn">
                    <i className="icon_heart_alt"></i>
                  </a>
                  <a href="cart.html" className="add-to-cart-btn">
                    Add to cart
                  </a>
                  <a href="#" className="compare-btn">
                    <i className="arrow_left-right_alt"></i>
                  </a>
                </div>
              </div>
              {/* Product Info */}
              <div className="product-info mt-15 text-center">
                <a href="shop-details.html">
                  <p>Cactus Flower</p>
                </a>
                <h6>$10.99</h6>
              </div>
            </div>
          </div>

          {/* Single Product Area */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div
              className="single-product-area mb-50 wow fadeInUp"
              data-wow-delay="400ms"
            >
              {/* Product Image */}
              <div className="product-img">
                <a href="shop-details.html">
                  <img src="/img/bg-img/12.jpg" alt="" />
                </a>
                {/* Product Tag */}
                <div className="product-tag sale-tag">
                  <a href="#">Hot</a>
                </div>
                <div className="product-meta d-flex">
                  <a href="#" className="wishlist-btn">
                    <i className="icon_heart_alt"></i>
                  </a>
                  <a href="cart.html" className="add-to-cart-btn">
                    Add to cart
                  </a>
                  <a href="#" className="compare-btn">
                    <i className="arrow_left-right_alt"></i>
                  </a>
                </div>
              </div>
              {/* Product Info */}
              <div className="product-info mt-15 text-center">
                <a href="shop-details.html">
                  <p>Cactus Flower</p>
                </a>
                <h6>$10.99</h6>
              </div>
            </div>
          </div>

          <div className="col-12 text-center">
            <a href="#" className="btn alazea-btn">
              View All
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}