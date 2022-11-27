import React, { useContext, Fragment, useState, useEffect } from 'react'

import { CartContext, allProducts } from '../../contexts/cart-item.context'

import FilterComponent from '../filter-component/filter.component'

const TagsComponent = () => {
  const { tagFilter, setTagField, productsTags, products, setProducts } =
    useContext(CartContext)
  const [handleTag, setHandleTag] = useState([])

  const handleTagFilter = (e) => {
    tagFilter(e.target.value)
    setTagField(e.target.value)
  }

  const selectedTagFilter = (e) => {
    setHandleTag([...handleTag, e.target.name])
    if (handleTag.includes(e.target.name)) {
      setHandleTag(handleTag.filter((tag) => tag !== e.target.name))
    }
  }
  useEffect(() => {
    if (handleTag.length === 0) {
      setProducts(allProducts)
    } else {
      const afterTagFilter = allProducts.filter((product) =>
        product.tags.includes(handleTag.join())
      )
      setProducts(afterTagFilter)
    }
  }, [handleTag, products, setProducts])

  const handleSelectAll = () => {
    setProducts(allProducts)
    setHandleTag([])
  }

  return (
    <Fragment>
      <FilterComponent
        header="Tags"
        inputData={productsTags}
        productsData={products}
        searchfield={handleTagFilter}
        inputEvent={selectedTagFilter}
        selectAll={handleSelectAll}
      />
    </Fragment>
  )
}

export default TagsComponent
