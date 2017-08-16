'use strict'

const React = require('react')
const { Iterator } = require('../iterator')
const { arrayOf, bool, func, number, shape, string } = require('prop-types')


class SelectionIterator extends Iterator {
  get classes() {
    return {
      selection: true
    }
  }

  get iteration() {
    return this.props.selections
  }

  isSelected(selection) {
    return this.props.active === selection
  }


  map(fn) {
    this.idx = {}

    return this.props.selections.map((selection, index) => {
      this.idx[selection] = index

      return fn({
        selection,
        cache: this.props.cache,
        isDisabled: this.props.isDisabled,
        isSelected: this.isSelected(selection.id),
        isLast: index === this.props.selections.length - 1,
        isVertical: this.isVertical,
        photo: this.props.photo,
        onSelect: this.props.onSelect
      })
    })
  }

  static propTypes = {
    active: number,
    isDisabled: bool.isRequired,
    photo: shape({
      id: number.isRequired
    }).isRequired,
    selections: arrayOf(shape({
      id: number.isRequired
    })).isRequired,
    cache: string.isRequired,
    size: number.isRequired,
    onSelect: func.isRequired
  }
}

module.exports = {
  SelectionIterator
}