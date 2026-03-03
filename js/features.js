/* ========================================
   FEATURES.JS - Nuevas Funcionalidades
   ======================================== */

$(document).ready(function () {

    /* ============================================
       1. MODO OSCURO CON BOTÓN
    ============================================ */
    var darkModeBtn = $('<button id="dark-mode-btn"><span id="dm-icon">🌙</span> <span id="dm-label">Modo Oscuro</span></button>');
    $('body').append(darkModeBtn);

    var darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        $('body').addClass('dark-mode');
        $('#dm-icon').text('☀️');
        $('#dm-label').text('Modo Claro');
    }

    $('#dark-mode-btn').on('click', function () {
        $('body').toggleClass('dark-mode');
        darkMode = $('body').hasClass('dark-mode');
        localStorage.setItem('darkMode', darkMode);
        if (darkMode) {
            $('#dm-icon').text('☀️');
            $('#dm-label').text('Modo Claro');
        } else {
            $('#dm-icon').text('🌙');
            $('#dm-label').text('Modo Oscuro');
        }
    });


    /* ============================================
       2. BOTÓN "MOSTRAR MÁS" EN PRODUCTOS
    ============================================ */
    var descriptions = [
        "Elegante diseño con acabados premium. Talla disponible: XS-XL. Material: 95% poliéster.",
        "Corte moderno y tela de alta calidad. Perfecto para eventos especiales. Envío gratuito.",
        "Diseño exclusivo de temporada. Disponible en varios colores. Devolución garantizada.",
        "Confección artesanal con detalles únicos. Cómodo y sofisticado. Talla ajustable.",
        "Material importado de primera calidad. Ideal para bodas y graduaciones. Colores vibrantes.",
        "Estilo contemporáneo con corte preciso. Incluye garantía de 30 días. Muy popular.",
        "Acabado brillante y duradero. Perfecto para toda ocasión. Disponible en tienda física.",
        "Colección limitada de diseñador. Tejido de lujo con detalles bordados a mano.",
        "Ajuste perfecto garantizado. Materiales 100% naturales. Certificado eco-friendly.",
        "Última tendencia de la temporada. Gran variedad de tallas. Atención personalizada."
    ];

    $('.product__item__text').each(function (i) {
        var desc = descriptions[i % descriptions.length];
        var $descSpan = $('<p class="product__desc">' + desc + '</p>');
        var $btn = $('<button class="btn-mostrar-mas">Ver descripción ▾</button>');
        $(this).append($descSpan).append($btn);
    });

    $(document).on('click', '.btn-mostrar-mas', function () {
        var $desc = $(this).prev('.product__desc');
        if ($desc.is(':visible')) {
            $desc.slideUp(200);
            $(this).text('Ver descripción ▾');
        } else {
            $desc.slideDown(200);
            $(this).text('Ocultar ▴');
        }
    });


    /* ============================================
       3. BOTÓN AGREGAR PRODUCTO DINÁMICAMENTE
       (Solo en index.html y shop.html)
    ============================================ */
    if ($('.property__gallery').length || $('.shop .row .col-lg-9').length) {

        var $addSection = $('<div class="add-product-section container"><button class="btn-add-product">+ Agregar Producto</button></div>');

        if ($('.property__gallery').length) {
            $('.product.spad').append($addSection);
        } else {
            $('.shop .col-lg-9').append($addSection);
        }

        var modalHTML = `
        <div id="add-product-overlay">
            <div class="add-product-modal">
                <span class="modal-close">&times;</span>
                <h4>Agregar Nuevo Producto</h4>
                <input type="text" id="new-product-name" placeholder="Nombre del producto" />
                <span class="error-msg" id="err-name"></span>
                <input type="text" id="new-product-price" placeholder="Precio (ej: 59.0)" />
                <span class="error-msg" id="err-price"></span>
                <select id="new-product-category">
                    <option value="">-- Selecciona categoría --</option>
                    <option value="women">Boda</option>
                    <option value="men">Prom</option>
                    <option value="kid">Esmoquin</option>
                    <option value="accessories">Accesorios</option>
                </select>
                <span class="error-msg" id="err-cat"></span>
                <input type="text" id="new-product-img" placeholder="URL de imagen (opcional)" />
                <button class="btn-submit-product">Agregar Producto</button>
            </div>
        </div>`;
        $('body').append(modalHTML);

        $(document).on('click', '.btn-add-product', function () {
            $('#add-product-overlay').addClass('active');
        });

        $(document).on('click', '.modal-close, #add-product-overlay', function (e) {
            if ($(e.target).is('#add-product-overlay') || $(e.target).is('.modal-close')) {
                $('#add-product-overlay').removeClass('active');
            }
        });

        $(document).on('click', '.btn-submit-product', function () {
            var name = $('#new-product-name').val().trim();
            var price = $('#new-product-price').val().trim();
            var cat = $('#new-product-category').val();
            var img = $('#new-product-img').val().trim() || 'img/product/V1.webp';
            var valid = true;

            $('#err-name, #err-price, #err-cat').text('');
            $('#new-product-name, #new-product-price, #new-product-category').removeClass('field-error');

            if (!name) {
                $('#err-name').text('El nombre es obligatorio.');
                $('#new-product-name').addClass('field-error');
                valid = false;
            }
            if (!price || isNaN(parseFloat(price))) {
                $('#err-price').text('Ingresa un precio válido.');
                $('#new-product-price').addClass('field-error');
                valid = false;
            }
            if (!cat) {
                $('#err-cat').text('Selecciona una categoría.');
                $('#new-product-category').addClass('field-error');
                valid = false;
            }

            if (!valid) return;

            var priceFloat = parseFloat(price).toFixed(1);
            var newProductHTML = `
            <div class="col-lg-3 col-md-4 col-sm-6 mix ${cat} shop-product-col" style="display:none">
                <div class="product__item">
                    <div class="product__item__pic set-bg" data-setbg="${img}" style="background-image:url('${img}')">
                        <div class="label new">Nuevo</div>
                        <ul class="product__hover">
                            <li><a href="${img}" class="image-popup"><span class="arrow_expand"></span></a></li>
                            <li><a href="#"><span class="icon_heart_alt"></span></a></li>
                            <li><a href="#"><span class="icon_bag_alt"></span></a></li>
                        </ul>
                    </div>
                    <div class="product__item__text">
                        <h6><a href="#">${name}</a></h6>
                        <div class="rating">
                            <i class="fa fa-star"></i><i class="fa fa-star"></i>
                            <i class="fa fa-star"></i><i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <div class="product__price">$ ${priceFloat}</div>
                    </div>
                </div>
            </div>`;

            var $newProduct = $(newProductHTML);

            if ($('.property__gallery').length) {
                $('.property__gallery').append($newProduct);
            } else {
                $('.shop .col-lg-9 .row').prepend($newProduct);
            }

            // Añadir descripción al nuevo producto
            var $newDesc = $('<p class="product__desc">Producto recién agregado. Disponible en todas las tallas. Consulta disponibilidad en tienda.</p>');
            var $newBtn = $('<button class="btn-mostrar-mas">Ver descripción ▾</button>');
            $newProduct.find('.product__item__text').append($newDesc).append($newBtn);

            $newProduct.slideDown(400);

            // Reiniciar Magnific Popup si está disponible
            try {
                $newProduct.find('.image-popup').magnificPopup({ type: 'image' });
            } catch (e) {}

            $('#add-product-overlay').removeClass('active');
            $('#new-product-name').val('');
            $('#new-product-price').val('');
            $('#new-product-category').val('');
            $('#new-product-img').val('');
        });
    }


    /* ============================================
       4. VALIDACIÓN JS REAL EN CONTACTO
    ============================================ */
    if ($('.contact__form form').length) {
        var $form = $('.contact__form form');
        var $nameInput = $form.find('input[placeholder="Nombre"]');
        var $emailInput = $form.find('input[placeholder="Correo"]');
        var $msgInput = $form.find('textarea');
        var $submitBtn = $form.find('button[type="submit"]');

        // Insertar mensajes de error
        $nameInput.after('<span class="error-msg" id="err-contact-name"></span>');
        $emailInput.after('<span class="error-msg" id="err-contact-email"></span>');
        $msgInput.after('<span class="error-msg" id="err-contact-msg"></span>');
        $form.append('<div class="success-msg" id="contact-success">✅ ¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.</div>');

        $submitBtn.on('click', function (e) {
            e.preventDefault();
            var name = $nameInput.val().trim();
            var email = $emailInput.val().trim();
            var msg = $msgInput.val().trim();
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var valid = true;

            // Limpiar errores
            $('.error-msg').text('');
            $nameInput.add($emailInput).add($msgInput).removeClass('field-error');
            $('#contact-success').hide();

            if (!name || name.length < 2) {
                $('#err-contact-name').text('Por favor ingresa tu nombre completo (mínimo 2 caracteres).');
                $nameInput.addClass('field-error');
                valid = false;
            }
            if (!email || !emailRegex.test(email)) {
                $('#err-contact-email').text('Ingresa un correo electrónico válido (ej: correo@ejemplo.com).');
                $emailInput.addClass('field-error');
                valid = false;
            }
            if (!msg || msg.length < 10) {
                $('#err-contact-msg').text('El mensaje debe tener al menos 10 caracteres.');
                $msgInput.addClass('field-error');
                valid = false;
            }

            if (valid) {
                $('#contact-success').fadeIn();
                $nameInput.val('');
                $emailInput.val('');
                $msgInput.val('');
            }
        });
    }


    /* ============================================
       5. FILTRO DE CATEGORÍA EN SHOP (barra lateral)
    ============================================ */
    if ($('.shop__sidebar').length && !$('.property__gallery').length) {

        // Agregar botones de filtro rápido arriba de los productos
        var filterHTML = `
        <div class="category-filter-btns">
            <button class="cat-filter-btn active" data-cat="all">Todos</button>
            <button class="cat-filter-btn" data-cat="boda">Boda</button>
            <button class="cat-filter-btn" data-cat="prom">Prom</button>
            <button class="cat-filter-btn" data-cat="esmoquin">Esmoquin</button>
            <button class="cat-filter-btn" data-cat="accesorios">Accesorios</button>
        </div>`;

        $('.shop .col-lg-9 .row').before(filterHTML);

        // Asignar categoría a cada producto en shop.html basándonos en el nombre
        $('.shop .col-lg-9 .col-lg-4').each(function () {
            var name = $(this).find('h6 a').text().toLowerCase();
            var cat = 'all';
            if (name.includes('encaje') || name.includes('manga') || name.includes('asimetric') || name.includes('raso') || name.includes('larga')) {
                cat = 'boda';
            } else if (name.includes('verde') || name.includes('plateado') || name.includes('negro') || name.includes('azul')) {
                cat = 'prom';
            } else if (name.includes('esmoquin')) {
                cat = 'esmoquin';
            } else if (name.includes('brazalete') || name.includes('accesorio')) {
                cat = 'accesorios';
            } else {
                cat = 'boda';
            }
            $(this).addClass('shop-product-col').attr('data-cat', cat);
        });

        $(document).on('click', '.cat-filter-btn', function () {
            var cat = $(this).data('cat');
            $('.cat-filter-btn').removeClass('active');
            $(this).addClass('active');

            if (cat === 'all') {
                $('.shop-product-col').removeClass('hidden');
            } else {
                $('.shop-product-col').each(function () {
                    if ($(this).data('cat') === cat) {
                        $(this).removeClass('hidden');
                    } else {
                        $(this).addClass('hidden');
                    }
                });
            }
        });

        // Hacer funcionales los links del sidebar
        $('.categories__accordion .card-body ul li a').on('click', function (e) {
            e.preventDefault();
            var text = $(this).text().toLowerCase();
            var catMap = {
                'vestidos': 'boda', 'velos': 'boda', 'lazos': 'boda', 'cola': 'boda', 'tejido': 'boda',
                'ajustado': 'prom', 'smock': 'prom', 'corto': 'prom', 'largo': 'prom',
                'coats': 'esmoquin', 'jackets': 'esmoquin', 'dresses': 'esmoquin', 'shirts': 'esmoquin', 't-shirts': 'esmoquin', 'jeans': 'esmoquin',
                'collares': 'accesorios', 'brazaletes': 'accesorios', 'aretes': 'accesorios', 'anillos': 'accesorios', 'broches': 'accesorios'
            };
            var cat = catMap[text] || 'all';
            $('.cat-filter-btn[data-cat="' + cat + '"]').trigger('click');
        });
    }

});
