// define templates for the Ride-Shopify-1.0.0 theme

var _usfImageWidths, _usfImageSize;
var _usfFormSections = "cart-notification-product,cart-notification-links,cart-button";

var _usfProductPrice = `
<div class="price" :class="{'price--sold-out': isSoldOut,'price--on-sale': hasDiscount}">
    <div class="price__container">
        <div class="price__regular">
            <span class="visually-hidden visually-hidden--inline" v-html="_usfRegularText"></span>
            <span class="price-item price-item--regular" v-html="priceVaries && !product.selectedVariantId ? loc.from + ' ' + displayMinDiscountedPrice : displayDiscountedPrice"></span>
        </div>
        <div class="price__sale">
            <template >
                <span class="visually-hidden visually-hidden--inline" v-html="_usfRegularText"></span>
                <span>
                    <s class="price-item price-item--regular" v-html="displayPrice"></s>
                </span>
            </template>
            <span class="visually-hidden visually-hidden--inline" v-html="_usfSalePrice"></span>
            <span class="price-item price-item--sale price-item--last" v-html="priceVaries && !product.selectedVariantId ? loc.from + ' ' + displayMinDiscountedPrice : displayDiscountedPrice"></span>
        </div>
    </div>
</div>
`;
var quickAddTemplate = `
<div v-if="_usfSectionSettings.enable_quick_add" class="quick-add">
    <product-form v-if="_usfProductHasOnlyDefaultVariant(product)">
        <form method="post" :action="usf.platform.addToCartUrl" :id="'quick-add-usf-section' + '-' + product.id" accept-charset="UTF-8" class="form" enctype="multipart/form-data" novalidate="novalidate" data-type="add-to-cart-form">
            <input type="hidden" name="form_type" value="product">
            <input type="hidden" name="utf8" value="✓">
            <input type="hidden" name="id" :value="selectedVariantForPrice.id" disabled>
            <button :id="'quick-add-usf-section' + '-' + product.id + '-submit'" type="submit" name="add" class="quick-add__submit button button--full-width button--secondary" aria-haspopup="dialog" :aria-labelledby="'quick-add-usf-section' + '-' + product.id + '-submit title-usf-section' + '-' + product.id" aria-live="polite" data-sold-out-message="true" :disabled="isSoldOut">
                <span v-html="isSoldOut ? _usfSoldOutText : _usfAddToCartText"></span>
                <span class="sold-out-message hidden" v-html="_usfSoldOutText"> </span>
                <div class="loading-overlay__spinner hidden">
                    <svg aria-hidden="true" focusable="false" role="presentation" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                        <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                    </svg>
                </div>
            </button>
        </form>
    </product-form>
    <template v-else>
        <modal-opener :data-modal="'#QuickAdd-' + product.id">
            <button :id="'quick-add-usf-section' + '-' + product.id + '-submit'" type="submit" name="add" class="quick-add__submit button button--full-width button--secondary" aria-haspopup="dialog" :aria-labelledby="'quick-add-usf-section' + '-' + product.id + '-submit title-usf-section' + '-' + product.id" :data-product-url="'/products/' + product.urlName">
                <span v-html="_usfChooseOptionsText"></span>
                <div class="loading-overlay__spinner hidden">
                    <svg aria-hidden="true" focusable="false" role="presentation" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                        <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                    </svg>
                </div>
            </button>
        </modal-opener>
        <quick-add-modal :id="'QuickAdd-' + product.id" class="quick-add-modal">
            <div role="dialog" :aria-label="_usfChooseProductOptionsText.replace('{{ product_name }}',product.title)" aria-modal="true" class="quick-add-modal__content global-settings-popup" tabindex="-1">
                <button :id="'ModalClose-' + product.id" type="button" class="quick-add-modal__toggle" :aria-label="_usfQuickCloseText" v-html="_usf_icon_close"></button>
                <div :id="'QuickAddInfo-' + product.id" class="quick-add-modal__content-info">
                </div>
            </div>
        </quick-add-modal>
    </template>
</div>`;
var _usfFilterBodyTemplate = /*inc_begin_filter-body*/
`<!-- Range filter -->
<div v-if="isRange" class="usf-facet-values usf-facet-range">
    <!-- Range inputs -->
    <div class="usf-slider-inputs usf-clear">
        <span class="usf-slider-input__from">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[0]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[0], 0)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
        <span class="usf-slider-div">-</span>
        <span class="usf-slider-input__to">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[1]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[1], 1)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
    </div>
	<!-- See API reference of this component at https://docs.sobooster.com/search/storefront-js-api/slider-component -->
    <usf-slider :color="facet.sliderColor" :symbols="facet.sliderValueSymbols" :prefix="facet.sliderPrefix" :suffix="facet.sliderSuffix" :min="facet.min" :max="facet.max" :pips="facet.range[0]" :step="facet.range[1]" :decimals="rangeDecimals" :value="range" :converter="rangeConverter" @input="onRangeSliderInput" @change="onRangeSliderChange"></usf-slider>
</div>
<!-- List + Swatch filter -->
<div v-else ref="values" :class="'usf-facet-values usf-scrollbar usf-facet-values--' + facet.display + (facet.navigationCollections ? ' usf-navigation' : '') + (facet.valuesTransformation ? (' usf-' + facet.valuesTransformation.toLowerCase()) : '') + (facet.circleSwatch ? ' usf-facet-values--circle' : '')" :style="!usf.isMobileFilter && facet.maxHeight ? { maxHeight: facet.maxHeight } : null">
    <!-- Filter options -->                
    <usf-filter-option v-for="o in visibleOptions" :facet="facet" :option="o" :key="o.label"></usf-filter-option>
</div>

<!-- More -->
<div v-if="isMoreVisible" class="usf-more" @click="onShowMore" v-html="loc.more"></div>`
/*inc_end_filter-body*/;

var _usfSearchResultsSkeletonItemTpl = 
`<div v-if="view === 'grid'" class="usf-sr-product grid__item usf-skeleton">
    <div class="usf-img"></div>
    <div class="usf-meta"></div>
</div>
<div class="usf-sr-product usf-skeleton" v-else>
    <!-- Image column -->
    <div class="usf-img-column">
        <div class="usf-img"></div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title"></div>
        <div class="usf-vendor"></div>
        <div class="usf-price-wrapper"></div>
    </div>
</div>`
;

var _usfSearchResultsSummaryTpl = /*inc_begin_search-summary*/
`<span class="usf-sr-summary" v-html="loader === true ? '&nbsp;' : usf.utils.format(term ? loc.productSearchResultWithTermSummary : loc.productSearchResultSummary, result.total, usf.utils.encodeHtml(term))"></span>`
/*inc_end_search-summary*/;

var _usfSearchResultsViewsTpl = /*inc_begin_search-views*/
`<div class="usf-views">
    <button class="usf-view usf-btn usf-icon usf-icon-grid" :class="{'usf-active': view === 'grid'}" @click.prevent.stop="onGridViewClick"></button>
    <button class="usf-view usf-btn usf-icon usf-icon-list" :class="{'usf-active': view === 'list'}" @click.prevent.stop="onListViewClick"></button>
</div>`
/*inc_end_search-views*/;

var _usfSearchResultsSortByTpl = /*inc_begin_search-sortby*/
`<usf-dropdown :placeholder="loc.sort" :value="sortBy" :options="sortByOptions" @input="onSortByChanged"></usf-dropdown>`
/*inc_end_search-sortby*/;

usf.templates = {
    // application
    app: 
`<div id="usf_container" class="usf-zone usf-clear" :class="{'usf-filters-horz': usf.settings.filters.horz}">
    <template v-if="hasFilters">
        <custom-filter class="usf-sr-filters"></custom-filter>
    </template>
    <usf-sr></usf-sr>
</div>`
,

    // search results
    searchResults: `
<div class="usf-sr-container" :class="{'usf-no-facets': noFacets, 'usf-empty': !loader && !hasResults, 'usf-nosearch': !showSearchBox}">
    <!-- Search form -->
    <form v-if="showSearchBox" action="/search" method="get" role="search" class="usf-sr-inputbox">
        <button type="submit" class="usf-icon usf-icon-search usf-btn"></button>
        <input name="q" autocomplete="off" ref="searchInput" v-model="termModel">
        <button v-if="termModel" class="usf-remove usf-btn" @click.prevent.stop="clearSearch"></span>
    </form>

    <div class="usf-sr-config" v-if="usf.isMobile">
        <div class="usf-sr-config__mobile-filters-wrapper">
            <div class="usf-filters" :class="{'usf-has-filters': !!facetFilters}" @click="onMobileToggle">
                <button class="usf-btn" v-html="loc.filters"></button>
            </div>
            ` + _usfSearchResultsSortByTpl + `
        </div>
        
        ` + _usfSearchResultsSummaryTpl + _usfSearchResultsViewsTpl + `
    </div>
    <div class="usf-sr-config" v-else>
        ` + _usfSearchResultsViewsTpl + _usfSearchResultsSummaryTpl + _usfSearchResultsSortByTpl + `
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && !result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Load previous -->
    <div id="usf-sr-top-loader" :class="{'usf-with-loader':loader === 'prev'}" v-if="(loader === 'prev' || itemsOffset) && loader !== true && hasResults && usf.settings.search.more !== 'page'"></div>
    <ul :class="(view === \'grid\' ? \'grid product-grid \' + _usf_grid_wrap_class : \'list-view-items\') + \' usf-results usf-clear usf-\' + view">
        <template v-if="loader===true">` + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl +
        `</template>
        <template v-else>
            <template v-if="hasResults">
                <template v-if="view === 'grid'">
                    <template v-for="(p,index) in result.items"><usf-ride-griditem :index="index" :product="p" :result="result" :key="p.id"></usf-ride-griditem></template>
                </template>
                <template v-else>
                    <template v-for="p in result.items"><usf-sr-listitem :product="p" :result="result" :key="p.id"></usf-sr-listitem></template>
                </template>
            </template>
            <template v-else>
                <!-- Empty result -->
                <div class="usf-sr-empty">
                    <div class="usf-icon"></div>
                    <span v-html="term ? usf.utils.format(loc.productSearchNoResults, term) : loc.productSearchNoResultsEmptyTerm"></span>
                    <button v-if="facetFilters" class="usf-btn usf-btn-action" v-html="loc.clearAllFilters" @click="usf.queryRewriter.removeAllFacetFilters"></button>
                </div>
            </template>
        </template>
    </ul>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Paging & load more -->
    <div class="usf-sr-paging" v-if="loader !== true">
        <div class="usf-sr-more" v-if="hasResults && usf.settings.search.more === 'more'">
            <div class="usf-title" v-html="usf.utils.format(loc.youHaveViewed, itemsLoaded, result.total)"></div>
            <div class="usf-progress">
                <div :style="{width: (itemsLoaded * 100 / result.total) + '%'}"></div>
            </div>
            <button v-if="itemsLoaded < result.total" class="usf-load-more" :class="{'usf-with-loader': loader === 'more'}" @click="onLoadMore"><span v-html="loc.loadMore"></span></button>
        </div>
        <usf-sr-pages v-else-if="hasResults && usf.settings.search.more === 'page'" :page="page" :pages-total="pagesTotal" :pages-to-display="4" :side-pages-to-display="1"></usf-sr-pages>
        <div class="usf-sr-loader usf-with-loader" v-else-if="loader === 'more'"></div>
    </div>
</div>
`,
    // Grid view item
    searchResultsGridViewItem: `
<li class="usf-sr-product grid__item usf-sr-product__image-container" :product-selector="product.id" :data-usf-pid="product.id">
    <div class="card-wrapper product-card-wrapper underline-links-hover" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave">
        <div class="card" :class="[_usfGetCardClass(product)]" :style="'--ratio-percent:' + 100/ratio + '%;'">
            <div class="card__inner ratio" :class="[(_usfGlobalSettings.card_style === 'standard' ? 'gradient color-' + _usfGlobalSettings.card_color_scheme : '')]" :style="'--ratio-percent:' + 100/ratio + '%;'">
                <div class="card__media ">
                    <!-- Wishlist -->
                    <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
                    <!-- Labels -->
                    <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>


                    <div class="media media--transparent media--hover-effect">
                        <img v-if="product.images.length"  :src="selectedImageUrl" :sizes="_usfImageSize" :alt="selectedImage.alt" class="motion-reduce" :width="selectedImage.width" :height="selectedImage.height">
                        <img v-else :srcset="_usfGetSrcset(selectedImage,selectedImageUrl)" :src="selectedImageUrl" :sizes="_usfImageSize" :alt="selectedImage.alt" class="motion-reduce" :loading="index > 3 ? 'lazy' : false" :width="selectedImage.width" :height="selectedImage.height">
                        <img v-if="hoverImage && _usfSectionSettings.show_secondary_image" :srcset="_usfGetSrcset(hoverImage,hoverImageUrl)" :src="hoverImageUrl" :sizes="_usfImageSize" class="motion-reduce" loading="lazy" :width="hoverImage.width" :height="hoverImage.height">
                    </div>
                </div>
                <a class="card__content" :href="productUrl">
                    
                    <!-- product image extra -->
                    <usf-plugin name="searchResultsProductPreview" :data="pluginData"></usf-plugin>
                    <usf-plugin name="searchResultsProductCart" :data="pluginData"></usf-plugin>

                    <div class="card__information">
                        <h3 class="card__heading" :id="product.images.length == 0 && _usfGlobalSettings.card_style === 'standard' ? 'title-usf-section' + '-' + product.id : false">
                            <a :href="productUrl" class="full-unstyled-link" v-html="product.title"></a>
                        </h3>
                    </div>
                    <!--badges-->
                    <div class="card__badge" :class="[_usfGlobalSettings.badge_position]">
                        <span v-if="isSoldOut && usf.settings.search.showSoldOut" class="badge badge--bottom-left" :class="['color-' + _usfGlobalSettings.sold_out_badge_color_scheme]" v-html="_usfSoldOutText"></span>
                        <span v-else-if="hasDiscount && usf.settings.search.showSale" class="badge badge--bottom-left" :class="['color-' + _usfGlobalSettings.sale_badge_color_scheme]" v-html="_usfSaleText"></span>
                    </div>
                </a>
            </div>
            <div class="card__content">
                <div class="card__information">
                    <h3 class="card__heading" :class="{'h5': product.images.length && _usfGlobalSettings.card_style == 'standard'}" :id="product.images.length == 0 && _usfGlobalSettings.card_style === 'standard' ? 'title-usf-section' + '-' + product.id : false">
                        <a :href="productUrl" class="full-unstyled-link" v-html="product.title"></a>
                    </h3>
                    <div class="card-information">
                        <template v-if="_usfSectionSettings.show_vendor && usf.settings.search.showVendor">
                            <span class="visually-hidden" v-html="_usfVendorText"></span>
                            <div class="caption-with-letter-spacing light" v-html="product.vendor"></div>
                        </template>

                        <span class="caption-large light" v-html="_usfBlockDesc"></span>
                        <!--theme reviews-->
                        <template v-if="_usfSectionSettings.show_rating && ratingMeta">
                            <div class="rating" role="img" :aria-label="_usfReviewInfo.replace('{{ rating_value }}',ratingMeta.value).replace('{{ rating_max }}',ratingMeta.scale_max)">
                                <span aria-hidden="true" class="rating-star" :class="['color-icon-' + _usfSectionSettings.accent_icons]" :style="'--rating: ' + Math.floor(ratingMeta.value) + '; --rating-max: ' + ratingMeta.scale_max + '; --rating-decimal: ' + rating_decimal + ';'"></span>
                            </div>
                            <p class="rating-text caption">
                                <span aria-hidden="true" v-html="ratingMeta.value + ' / ' + ratingMeta.scale_max"></span>
                            </p>
                            <p class="rating-count caption">
                                <span aria-hidden="true" v-html="'(' + usf.utils.getMetafield(product,'reviews','rating_count') + ')'"></span>
                                <span class="visually-hidden" v-html="usf.utils.getMetafield(product,'reviews','rating_count') + ' ' + _usf_total_reviews"></span>
                            </p>
                        </template>
                        <!-- Product review -->
                        <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
                        `+ _usfProductPrice +`
                        <!-- Swatch-->
                        <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
                    </div>
                </div>
                <!--`+quickAddTemplate+`-->
                <div class="card__badge" :class="[_usfGlobalSettings.badge_position]">
                    <span v-if="isSoldOut && usf.settings.search.showSoldOut" class="badge badge--bottom-left" :class="['color-' + _usfGlobalSettings.sold_out_badge_color_scheme]" v-html="_usfSoldOutText"></span>
                    <span v-else-if="hasDiscount && usf.settings.search.showSale" class="badge badge--bottom-left" :class="['color-' + _usfGlobalSettings.sale_badge_color_scheme]" v-html="_usfSaleText"></span>
                </div>
            </div>
        </div>
    </div>
</li>
`,
    // Search result pages
    searchResultsPages: `
<div class="pagination-wrapper">
    <nav class="pagination" role="navigation" aria-label="Pagination">
        <ul class="pagination__list list-unstyled" role="list">
            <template v-for="e in elements">
                <li v-if="e.type === 'prev'">
                    <a href="javascript:void(0)" :aria-label="loc.prevPage" @click="onPrev" class="pagination__item pagination__item--next pagination__item-arrow link motion-reduce">
                        <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor">
                            </path>
                        </svg>
                    </a>
                </li>
                <li v-else-if="e.type === 'dots'" class="usf-sr-pages__dots"><span>...</span></li>
                <li v-else-if="e.type === 'page' && e.current"><span class="pagination__item pagination__item--current" aria-current="page">{{e.page}}</span></li>
                <li v-else-if="e.type === 'page' && !e.current"><a href="javascript:void(0)" @click="ev=>onPage(e.page,ev)" :title="usf.utils.format(loc.gotoPage,e.page)" class="pagination__item link">{{e.page}}</a></li>
                <li v-else-if="e.type === 'next'">
                    <a href="javascript:void(0)" :aria-label="loc.nextPage" @click="onNext" class="pagination__item pagination__item--prev pagination__item-arrow link motion-reduce">
                        <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor">
                            </path>
                        </svg>
                    </a>
                </li>
            </template>
        </ul>
    </nav>
</div>
`,
    // List view item
    searchResultsListViewItem: /*inc_begin_search-list-item*/
`<a class="usf-sr-product" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :href="productUrl" :data-usf-pid="product.id">
    <!-- Image column -->
    <div class="usf-img-column">
        <!-- product image -->
        <div class="usf-img-wrapper usf-sr-product__image-container" :class="{'usf-has-second-img': hoverImage}">
            <div class="usf-main-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledSelectedImageUrl)" :style="{'background-image': 'url(' + getSelectedImageUrl('600') + ')'}"></div>
            <span class="usf-img-loader"></span>
            <template v-if="hoverImage">
                <div class="usf-second-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledHoverImageUrl)" :style="{'background-image': 'url(' + getHoverImageUrl('600') + ')'}"></div>
                <span class="usf-img-loader"></span>
            </template>
            <!-- product image extra -->
            <usf-plugin name="searchResultsProductPreview" :data="pluginData"></usf-plugin>
            <usf-plugin name="searchResultsProductCart" :data="pluginData"></usf-plugin>
            
            <div v-if="isSoldOut && usf.settings.search.showSoldOut" class="usf-badge"><span v-html="loc.soldOut"></div>
            <div v-else-if="hasDiscount && usf.settings.search.showSale" class="usf-badge usf-sale-badge"><span v-html="loc.sale"></span></div>
        </div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title" v-html="product.title"></div>
        <div class="usf-vendor" v-if="usf.settings.search.showVendor" v-html="product.vendor"></div>

        <!-- price -->
        <usf-plugin name="searchResultsProductPrice" :data="pluginData"></usf-plugin>
        <div class="usf-price-wrapper" :class="{'usf-price--sold-out': isSoldOut}" v-if="!usf.plugins.lastRenderResult" :data-variant-id="product.selectedVariantId">
            <span class="usf-price" :class="{'usf-has-discount': hasDiscount}" v-html="displayPrice"></span>
            <span class="usf-discount" v-if="hasDiscount" v-html="displayDiscountedPrice"></span>
            <span v-if="hasDiscount" class="usf-price-savings" v-html="loc.save + ' ' + salePercent + '%'"></span>
        </div>
        <div class="usf-description"></div>
    </div>
</a>`
/*inc_end_search-list-item*/,
    // AddToCart Plugin	
    addToCartPlugin: /*inc_begin_addtocart-plugin*/
`<form class="usf-add-to-cart" method="POST" enctype="multipart/form-data" :action="usf.platform.addToCartUrl">
    <input type="hidden" name="form_type" value="product">
    <input type="hidden" name="utf8" value="✓">
    <input type="hidden" name="quantity" value="1">
    <input type="hidden" name="id" :value="variant.id">
    <usf-choose-options v-if="args.product.variants.length > 1" :loc="usf.settings.translation" :args="args"></usf-choose-options>
    <button v-else-if="!usf.utils.isVariantSoldOut(variant)" type="submit" name="add" class="usf-add-to-cart-btn" :data-product-id="args.product.id" @click.prevent.stop="_usfAddToCart">
        <span class="usf-icon usf-icon-cart"></span>
        <span class="usf-label" v-html="loc.addToCart"></span>
    </button>
</form>`
/*inc_end_addtocart-plugin*/,

    // Preview Plugin
    previewPlugin: /*inc_begin_preview-plugin*/
`<div class="usf-sr-preview" :class="['usf-sr-' + settings.iconPosition]" @click.prevent.stop="onShowModal">
    <span class="usf-icon usf-icon-eye"></span>
</div>`
/*inc_end_preview-plugin*/,

    previewPluginModal: /*inc_begin_preview-modal*/
`<div><div class="usf-backdrop"></div><div class="usf-preview__wrapper usf-zone"><div class="usf-preview__container">
    <div class="usf-preview">
        <!-- Close button -->
        <div class="usf-remove" @click="onClose"></div>

        <!-- Body content -->
        <div class="usf-preview__body">
            <!-- left - images of product -->
            <div class="usf-preview__content-left">
                <!-- Big image -->
                <div class="usf-preview__image-slider">
                    <div type="button" title="Prev" class="usf-preview__image-slider__btn usf-prev usf-icon usf-icon-up" @click="onPrevImage(0)" v-if="showBigImageNav"></div>

                    <div class="usf-preview__image-slider__track">
                        <div v-for="i in images" class="usf-preview__image-wrapper" :class="{'usf-active': image === i}"">
                            <div v-if="image === i" class="usf-preview__image lazyload" :data-bgset="usf.platform.getImageUrl(i.url,1024)" :style="'background-image:url('+usf.platform.getImageUrl(i.url, 1024)+')'"></div>
                            <span class="usf-img-loader"></span>
                        </div>
                    </div>

                    <div type="button" title="Next" class="usf-preview__image-slider__btn usf-next usf-icon usf-icon-up" @click="onNextImage(0)" v-if="showBigImageNav"></div>

                    <ul class="usf-preview__image-slider__dots" v-if="showImageIndices && false">
                        <li :class="{'active':i===image}" v-for="(i,index) in images"  @click="onThumbClick(i)"><button type="button">{{index+1}}</button></li>
                    </ul>
                </div>

                <!-- Thumbnails -->
                <div class="usf-preview__thumbs" v-if="showThumbs">
                    <div class="usf-preview__thumbs-inner">
                        <span v-for="i in images" class="usf-preview__thumb" :class="{'usf-active': image === i}" @click="onThumbClick(i)"></span>
                    </div>
                </div>

                <!-- Badges -->
                <div class="usf-preview__badge usf-preview__badge-sale" v-if="hasDiscount" v-html="loc.sale"></div>
            </div>

            <!-- right - info of the product -->
            <div class="usf-preview__content-right usf-scrollbar">
                <div class="usf-preview__content-summary">
                    <!-- Product title -->
                    <h1 class="usf-preview__title"><a :href="productUrl" v-html="product.title"></a></h1>

                    <!-- Vendor -->
                    <div class="usf-preview__vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

                    <!--Prices -->
                    <div class="usf-preview__price-wrapper" :class="{'price--sold-out': isSoldOut}">
                        <span class="usf-price" :class="{'usf-has-discount': hasDiscount}" v-html="usf.utils.getDisplayPrice(selectedVariant.compareAtPrice || selectedVariant.price)"></span>
                        <span v-if="hasDiscount" class="usf-discount" v-html="usf.utils.getDisplayPrice(selectedVariant.price)"></span>

                        <div v-if="false" class="price__badges price__badges--listing">
                            <span class="price__badge price__badge--sale" aria-hidden="true" v-if="hasDiscount && usf.settings.search.showSale">
                                <span v-html="loc.sale"></span>
                            </span>
                            <span class="price__badge price__badge--sold-out" v-if="isSoldOut && usf.settings.search.showSoldOut">
                                <span v-html="loc.soldOut"></span>
                            </span>
                        </div>
                    </div>

                    <!-- Description -->
                    <p class="usf-preview__description" :class="{'usf-with-loader':description===undefined}" v-html="description"></p>

                    <!-- Add to cart form -->
                    <form method="post" enctype="multipart/form-data" :action="usf.platform.addToCartUrl" @submit="_usfAddToCart">
                        <!-- variant ID -->
                        <input type="hidden" name="id" :value="selectedVariant.id" />

                        <!-- Options -->
                        <template v-for="(o,index) in product.options">
                            <usf-preview-modal-option :option="o" :index="index"></usf-preview-modal-option>
                        </template>

                        <!-- add to card button -->
                        <div class="usf-preview__field">                            
                            <div class="usf-flex usf-preview__add-to-cart">
                                <usf-num-input v-model="quantity" name="quantity" :disabled="!hasAvailableVariant" :min="1" :max="available" />
                                <button :title="!hasAvailableVariant ? loc.selectedVariantNotAvailable : ''" :disabled="!hasAvailableVariant" type="submit" name="add" class="usf-add-to-cart-btn" :class="{ 'usf-disabled': !hasAvailableVariant}">
                                    <span class="usf-label" v-html="loc.addToCart"></span>
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- See details link -->
                    <a class="usf-preview__link" :href="productUrl" v-html="loc.seeFullDetails"></a>
                </div>
            </div>
        </div>
    </div>
</div></div></div>`
/*inc_end_preview-modal*/,

    searchResultsBanner: /*inc_begin_search-banner*/        
`<div class="usf-sr-banner">
    <a :href="banner.url || 'javascript:void(0)'" :alt="banner.description">
        <img :src="banner.mediaUrl" style="max-width:100%">
    </a>
</div>
`
/*inc_end_search-banner*/,

    ////////////////////////
    // Filter templates
    // facet filters breadcrumb
    filtersBreadcrumb: /*inc_begin_filters-breadcrumb*/
`<div v-if="usf.settings.filterNavigation.showFilterArea && root.facetFilters && root.facets && facetFilterIds.length" class="usf-refineby">
    <!-- Breadcrumb Header -->
    <div class="usf-title usf-clear">
        <span class="usf-pull-left usf-icon usf-icon-equalizer"></span>
        <span class="usf-label" v-html="loc.filters"></span>

        <!-- Clear all -->
        <button class="usf-clear-all usf-btn" v-html="loc.clearAll" @click.prevent.stop="root.removeAllFacetFilters" :aria-label="loc.clearAllFilters"></button>
    </div>

    <!-- Breadcrumb Values -->
    <div class="usf-refineby__body">
        <template v-for="facetId in facetFilterIds" v-if="(facet = root.facets.find(fc => fc.id === facetId)) && (f = root.facetFilters[facetId])">
            <template v-for="queryValStr in f[1]">
                <div class="usf-refineby__item usf-pointer usf-clear" @click.prevent.stop="root.removeFacetFilter(facetId, queryValStr)">
                    <button class="usf-btn"><span class="usf-filter-label" v-html="facet.title + ': '"></span><b v-html="root.formatBreadcrumbLabel(facet, f[0], queryValStr)"></b></button><span class="usf-remove"></span>
                </div>
            </template>
        </template>
    </div>
 </div>`
 /*inc_end_filters-breadcrumb*/,

    // facet filters    
    filters: /*inc_begin_filters*/
// Vert & Horz modes have different render order
`<div class="usf-facets usf-no-select usf-zone" :class="{'usf-facets--mobile':usf.isMobileFilter}">
<!-- Mobile view -->
<template v-if="usf.isMobile">
    <div class="usf-close" @click="onMobileBack(1)"></div>
    <div class="usf-facets-wrapper">
        <!-- Header. shows 'Filters', facet name, etc. -->
        <div class="usf-header">
            <!-- Single facet mode -->
            <template v-if="isSingleFacetMode">
                <div class="usf-title" @click="onMobileBack(0)" v-html="facets[0].title"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clear"></div>
            </template>

            <!-- When a filter is selected -->
            <template v-else-if="mobileSelectedFacet">
                <div class="usf-title usf-back" @click="onMobileBack(0)" v-html="mobileSelectedFacet.title"></div>
                <div v-if="facetFilters && facetFilters[mobileSelectedFacet.id]" class="usf-clear" @click="removeFacetFilter(mobileSelectedFacet.id)" v-html="loc.clear"></div>
                <div v-else-if="mobileSelectedFacet.multiple" class="usf-all" @click="selectFacetFilter(mobileSelectedFacet)" v-html="loc.all"></div>
            </template>

            <!-- When no filter is selected -->
            <template v-else>
                <div class="usf-title" @click="onMobileBack(0)" v-html="loc.filters"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clearAll"></div>
            </template>
        </div>

        <div class="usf-body">
            <!-- Desktop-like filter in mobile -->
            <template v-if="usf.settings.filters.desktopLikeMobile">
                <usf-filter-breadcrumb></usf-filter-breadcrumb>
                
                <!-- Facets body -->
                <div class="usf-facets__body">
                    <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
                </div>
            </template>
            
            <!-- Mobile filter -->
            <template v-else>
                <!-- List all filter options, in single facet mode -->
                <usf-filter v-if="isSingleFacetMode" :facet="facets[0]"></usf-filter>

                <!-- List all filter options, when a filter is selected -->
                <usf-filter v-else-if="mobileSelectedFacet" :facet="mobileSelectedFacet"></usf-filter>

                <!-- List all when there are more than one facet -->
                <template v-else :key="f.id" v-for="f in facets">
                    <template v-if="canShowFilter(f)">
                        <div class="usf-facet-value" @click="onMobileSelectFacet(f)">
                            <span class="usf-title" v-html="f.title"></span>
                            <div v-if="(selectedFilterOptionValues = facetFilters && (ff = facetFilters[f.id]) ? ff[1] : null)" class="usf-dimmed">
                                <span v-for="cf in selectedFilterOptionValues" v-html="formatBreadcrumbLabel(f, f.facetName, cf)"></span>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </div>

        <!-- View items -->
        <div class="usf-footer">
            <div @click="onMobileBack(1)" v-html="loc.viewItems"></div>
        </div>
    </div>
</template>

<!-- Desktop view -->
<template v-else>
    <usf-filter-breadcrumb></usf-filter-breadcrumb>
    <!-- Filters Loader -->
    <div v-if="!facets" class="usf-facets__first-loader">
        <template v-for="i in 3">
            <div class="usf-facet"><div class="usf-title usf-no-select"><span class="usf-label"></span></div>
                <div v-if="!usf.settings.filters.horz" class="usf-container"><div class="usf-facet-values usf-facet-values--List"><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div></div></div>
            </div>
        </template>
    </div>
    <!-- Facets body -->
    <div v-else class="usf-facets__body">
        <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
    </div>
</template>
</div>`
/*inc_end_filters*/,

    // facet filter item
    filter: /*inc_begin_filter*/
`<div v-if="canShow" class="usf-facet" :class="{'usf-collapsed': collapsed && !usf.isMobileFilter, 'usf-has-filter': isInBreadcrumb}">
    <!-- Mobile filter -->
    <div v-if="usf.isMobileFilter" class="usf-container">
        <!-- Search box -->
        <input v-if="hasSearchBox" class="usf-search-box" :aria-label="loc.filterOptions" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

        <!-- Values -->
        ` + _usfFilterBodyTemplate +
    `</div>

    <!-- Desktop filter -->
    <template v-else>
        <!-- Filter title -->
        <div class="usf-clear">
            <div class="usf-title usf-no-select" @click.prevent.stop="onExpandCollapse">
                <button class="usf-label usf-btn" v-html="facet.title" :aria-label="usf.utils.format(loc.filterBy,facet.title)" :aria-expanded="!collapsed"></button>
                <usf-helptip v-if="facet.tooltip" :tooltip="facet.tooltip"></usf-helptip>            
                <!-- 'Clear all' button to clear the current facet filter. -->
                <button v-if="isInBreadcrumb" class="usf-clear-all usf-btn" :title="loc.clearFilterOptions" :aria-label="usf.utils.format(loc.clearFiltersBy,facet.title)" @click.prevent.stop="onClear" v-html="loc.clear"></button>
                <span class="usf-pm"></span>
            </div>
        </div>

        <!-- Filter body -->
        <div class="usf-container">
            <!-- Search box -->
            <input v-if="hasSearchBox" class="usf-search-box" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

            ` + _usfFilterBodyTemplate +
        `
        </div>
    </template>
</div>`
/*inc_end_filter*/,

    // facet filter option
    filterOption: /*inc_begin_filter-option*/
`<div v-if="children" :class="(isSelected ? 'usf-selected ' : '') + ' usf-relative usf-facet-value usf-facet-value-single usf-with-children' + (collapsed ? ' usf-collapsed' : '')">
    <!-- option label -->
    <button class="usf-pm usf-btn" v-if="children" @click.prevent.stop="onToggleChildren"></button>
    <button class="usf-label usf-btn" v-html="label" @click.prevent.stop="onToggle"></button>

    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>    

    <div class="usf-children-container" v-if="children && !collapsed">
        <button :class="'usf-child-item usf-btn usf-facet-value' + (isChildSelected(c) ? ' usf-selected' : '')" v-for="c in children" v-html="getChildLabel(c)" @click="onChildClick(c)"></span>
    </div>
</div>
<button v-else :class="(isSelected ? 'usf-selected ' : '') + (swatchImage ? ' usf-facet-value--with-background' : '') + ' usf-btn usf-relative usf-facet-value usf-facet-value-' + (facet.multiple ? 'multiple' : 'single')" :title="isSwatch || isBox ? label + ' (' + option.value + ')' : undefined" :style="usf.isMobileFilter ? null : swatchStyle" @click.prevent.stop="onToggle">
    <!-- checkbox -->
    <div v-if="!isBox && !isSwatch && facet.multiple" :class="'usf-checkbox' + (isSelected ? ' usf-checked' : '')">
        <span class="usf-checkbox-inner"></span>
    </div>

    <!-- swatch image in mobile -->
    <div v-if="swatchImage && usf.isMobileFilter" class="usf-mobile-swatch" :style="swatchStyle"></div>

    <!-- option label -->
    <span class="usf-label usf-btn" v-html="label"></span>
    
    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>
</button>`
/*inc_end_filter-option*/,

    // Instant search popup
    instantSearch: /*inc_begin_instantsearch*/
`<div :class="'usf-popup usf-zone usf-is usf-is--compact usf-is--' + position + (shouldShow ? '' : ' usf-hide') + (isEmpty ? ' usf-empty' : '') + (hasProductsOnly ? ' usf-is--products-only' : '') + (firstLoader ? ' usf-is--first-loader': '')"  :style="usf.isMobile ? null : {left: this.left + 'px',top: this.top + 'px',width: this.width + 'px'}">
    <!-- Mobile search box -->
    <div v-if="usf.isMobile">
        <form class="usf-is-inputbox" :action="searchUrl" method="get" role="search">
            <span class="usf-icon usf-icon-back usf-close" @click="usf.utils.hideInstantSearch"></span>
            <input name="q" autocomplete="off" ref="searchInput" :value="term" @input="onSearchBoxInput">
            <span class="usf-remove" v-if="term" @click="onClear"></span>
        </form>
    </div>

    <!-- First loader -->
    <div class="usf-is-first-loader" v-if="firstLoader">
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
    </div>

    <!-- All JS files loaded -->
    <template v-else>
        <!-- Empty view -->
        <div v-if="isEmpty" class="usf-is-no-results">
            <div style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-items.png?t=2') center no-repeat;min-height:160px"></div>
            <div v-html="usf.utils.format(loc.noMatchesFoundFor, term)"></div>
        </div>
        <template v-else>
            <!-- Body content -->
            <div class="usf-is-content">
                <!-- Products -->
                <div class="usf-is-matches usf-is-products">
                    <div class="usf-title" v-html="queryOrTerm ? loc.productMatches : loc.trending"></div>
                    
                    <div class="usf-is-list" v-if="result.items.length">
                        <!-- Did you mean -->
                        <span class="usf-is-did-you-mean" v-html="usf.utils.format(loc.didYouMean, usf.utils.encodeHtml(term), result.query)" v-if="termDiffers"></span>

                        <!-- Product -->
                        <usf-is-item v-for="p in result.items" :product="p" :result="result" :key="p.id + '-' + p.selectedVariantId"></usf-is-item>
                    </div>
                    <div class="usf-is-list" v-else style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-products.png?t=2') center no-repeat;min-height:250px"></div>
                </div>

                <div class="usf-is-side">
                    <!-- Suggestions -->
                    <div class="usf-is-matches usf-is-suggestions" v-if="result.suggestions && result.suggestions.length">
                        <div class="usf-title" v-html="loc.searchSuggestions"></div>
                        <span v-for="s in result.suggestions" class="usf-is-match" v-html="usf.utils.highlight(s, result.query)" @click="search(s)"></span>
                    </div>

                    <!-- Collections -->
                    <div class="usf-is-matches usf-is-collections" v-if="result.collections && result.collections.length">
                        <div class="usf-title" v-html="loc.collections"></div>
                        <span v-for="c in result.collections" class="usf-is-match" v-html="usf.utils.highlight(c.title, result.query)" @click="selectCollection(c)"></span>
                    </div>

                    <!-- Pages -->
                    <div class="usf-is-matches usf-is-pages" v-if="result.pages && result.pages.length">
                        <div class="usf-title" v-html="loc.pages"></div>
                        <span v-for="p in result.pages" class="usf-is-match" v-html="usf.utils.highlight(p.title, result.query)" @click="selectPage(p)"></span>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="usf-is-viewall">
                <span @click="search(queryOrTerm)" v-html="usf.utils.format(queryOrTerm ? loc.viewAllResultsFor : loc.viewAllResults, queryOrTerm)"></span>
            </div>
        </template>
    </template>
</div>`
/*inc_end_instantsearch*/
,

    // Instant search item
    instantSearchItem:/*inc_begin_instantsearch-item*/
`<span class="usf-is-product usf-clear" @click="onItemClick">
    <!-- Image -->
    <div class="usf-img-wrapper usf-pull-left">
        <img class="usf-img" :src="selectedImageUrl">
    </div>
    
    <div class="usf-pull-left">
        <!-- Title -->
        <div class="usf-title" v-html="usf.utils.highlight(product.title, result.query)"></div>

        <!-- Vendor -->
        <div class="usf-vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

        <!-- Prices -->
        <div class="usf-price-wrapper">
            <span class="usf-price" :class="{ 'usf-has-discount': hasDiscount }" v-html="displayPrice"></span>
            <span v-if="hasDiscount" class="usf-discount" v-html="displayDiscountedPrice"></span>
        </div>
    </div>
</span>`
/*inc_end_instantsearch-item*/,

};

//add formData for _usfOnAddToCartSuccess
var _customFormData = `<input type="hidden" name="sections" :value="_usfFormSections">
<input type="hidden" name="sections_url" :value="window.location.pathname"></form>`;
usf.templates.addToCartPlugin = usf.templates.addToCartPlugin.replace('</form>', _customFormData);
usf.templates.previewPluginModal = usf.templates.previewPluginModal.replace('</form>', _customFormData);

usf.event.add('init', function () {    
	// register or override components
    // ...    
    /*var SearchResultsGridItem2 = {
        template: usf.templates.searchResultsGridViewItem,
    }
    usf.register(SearchResultsGridItem2, usf.components.SearchResultsGridItem, "usf-sr-griditem");*/
    _usfImageWidths = _usfIsDynamicImage ? [200, 400, 600, 700, 800, 900, 1000, 1200] : [usf.settings.search.imageSize];
    _usfSetDefaultSettings();

        //add formData for _usfOnAddToCartSuccess
        var _usfCartNotification = document.querySelector('cart-notification');
        if (_usfCartNotification)
            _usfFormSections = _usfCartNotification.getSectionsToRender().map((section) => section.id);

    //document.body.classList.add('usf-dark')
    // Inheritted component for grid view
    var RideGridItem = {
        props: { 
            index: Number
        },
        mixins: [usf.components.SearchResultsGridItem],
        template: usf.templates.searchResultsGridViewItem,
        computed: {
            ratio() {
                if (this.product.images && _usfSectionSettings.media_aspect_ratio == 'portrait')
                    return 0.8;
                else if (this.product.images && _usfSectionSettings.media_aspect_ratio == 'adapt')
                    return _usfGetImageRatio(this.selectedImage);
                return 1
            },
            rating_decimal() {
                if (_usfSectionSettings.show_rating && this.ratingMeta) {
                    console.log(this.ratingMeta)
                    var rating_decimal = 0;
                    var decimal = this.ratingMeta.value % 1;
                    if (decimal >= 0.3 && decimal <= 0.7)
                        rating_decimal = 0.5;
                    else if (decimal > 0.7)
                        rating_decimal = 1;

                    return rating_decimal
                }
                return 0
            },
            ratingMeta() {
                var meta = usf.utils.getMetafield(this.product, 'reviews', 'rating');
                if (meta != '')
                    return JSON.parse(meta)
                return 0
            }
        }
    }
    usf.register(RideGridItem, null, "usf-ride-griditem");

     /**
   * custom filter
   * */
      var CustomFilter = {
        mounted() {
            this.$nextTick(function () {
                if (!usf.settings.filters.horz && !usf.isMobile) {
                    var el = this.$el;
                    var drawerZone = document.getElementById('usf_filters')
                    if (drawerZone) {
                        drawerZone.insertBefore(el, drawerZone.firstChild);
                        document.body.classList.add('usf-has-filter-drawer');
                    }

                }
            })
        },
        render(h) {
            return h('usf-filters');
        }
    }
    usf.register(CustomFilter, null, 'custom-filter');   

    _usfImageSize = `(min-width: ${_usfGlobalSettings.page_width}px) ${(_usfGlobalSettings.page_width-130)/4 }px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)`
      
});

function _usfOnAddToCartSuccess(rs, formSelector) {
    var cartNotification = document.querySelector('cart-notification');
    if (cartNotification)
        cartNotification.renderContents(rs);

    var cartCountSelector = document.querySelector('.header__icon--cart');
    if (cartCountSelector) {
        fetch(usf.platform.baseUrl + '/cart.js', {
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
        }).then(r => {
            return r.json();
        }).then(cart => {
            if (cartCountSelector.querySelector('.cart-count-bubble')) {
                cartCountSelector.querySelector('.cart-count-bubble span[aria-hidden="true"]').innerHTML = cart.item_count;
            } else {
                var c = document.createElement('div');
                c.classList.add('cart-count-bubble');
                c.innerHTML = `<span aria-hidden="true">${cart.item_count}</span>`;
                cartCountSelector.appendChild(c)
            }
        });
    } else
        location.href = '/cart';

}

function _usfGetCardClass(p) {
    var rs = 'card--' + _usfGlobalSettings.card_style;
    rs += (p.images.length ? ' card--media' : ' card--media');
    if (_usfGlobalSettings.card_style == 'card')
        rs += ' color-' + _usfGlobalSettings.card_color_scheme + ' gradient';
    if (p.images.length == 0 && _usfGlobalSettings.card_style == ' card')
        rs += ' ratio';
    return rs
}

function _usfGetSrcset(img, imgUrl) {
    if (_usfIsDynamicImage) {
        var srcset = [];
        if (img.width >= 165)
            srcset.push(imgUrl.replace('{size}', 165) + ' 165w');
        if (img.width >= 360)
            srcset.push(imgUrl.replace('{size}', 360) + ' 360w');
        if (img.width >= 533)
            srcset.push(imgUrl.replace('{size}', 533) + ' 533w');
        if (img.width >= 720)
            srcset.push(imgUrl.replace('{size}', 720) + ' 720w');
        if (img.width >= 940)
            srcset.push(imgUrl.replace('{size}', 940) + ' 940w');
        if (img.width >= 1066)
            srcset.push(imgUrl.replace('{size}', 1066) + ' 1066w');
        srcset.push(img.url + ' ' + img.width + 'w');

        return srcset.join(',')

    } else
        return imgUrl + ' ' + usf.settings.search.imageSize + 'w'
}

function _usfSetDefaultSettings() {
    window._usf_grid_wrap_class = window._usf_grid_wrap_class || " grid--2-col-tablet-down  grid--4-col-desktop ";

    window._usfGlobalSettings = window._usfGlobalSettings || {
        card_style: "card",
        card_color_scheme: "background-1",
        page_width: 1200,
        badge_position: "bottom left",
        sold_out_badge_color_scheme: "inverse",
        sale_badge_color_scheme: "accent-2",
        accent_icons: "text",
    };
    window._usfSectionSettings = window._usfSectionSettings || {
        media_aspect_ratio: "portrait",
        show_secondary_image: true,
        show_vendor: true,
        show_rating: true,
        enable_quick_add: true,
    };
    window._usfSoldOutText = window._usfSoldOutText || usf.settings.translation.soldOut;
    window._usfSaleText = window._usfSaleText || usf.settings.translation.sale;
    window._usfVendorText = window._usfVendorText || "Vendor:";
    window._usfBlockDesc = window._usfBlockDesc || null;
    window._usfRegularText = window._usfRegularText || "Regular price";
    window._usfSalePrice = window._usfSalePrice || "Sale price";
    window._usfReviewInfo = window._usfReviewInf || "{{ rating_value }} out of {{ rating_max }} stars";
    window._usf_total_reviews = window._usf_total_reviews || "total reviews";
    window._usfAddToCartText = window._usfAddToCartText || usf.settings.translation.addToCart;
    window._usfChooseOptionsText = window._usfChooseOptionsText || usf.settings.translation.chooseOptions;
    window._usfChooseProductOptionsText = window._usfChooseProductOptionsText || "Choose options for {{ product_name }}";
    window._usfQuickCloseText = window._usfQuickCloseText || "Close";
}

/* Begin theme ready code */

if (usf.isMobile && usf.settings.instantSearch.online) {
    var searchIcon = document.querySelector('.header__icons summary.modal__toggle');
    if (searchIcon) {
        searchIcon.addEventListener('click', function (e) {
            var target  = document.createElement('input');
            usf.utils.loadAndShowInstantSearch(target, true);
            usf.utils.stopEvent(e);
        })
    }

    // still register to 'is_show' event to hide the drawer.
    usf.event.add('is_show', function () {
        // close the theme search box
        var btn = document.querySelector('.header__icons .search-modal__content-bottom button.modal__close-button');
        if (btn)
            btn.click();
    });
}
/* End theme ready code */

