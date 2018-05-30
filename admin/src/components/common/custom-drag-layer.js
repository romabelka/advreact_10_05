import React, { Component } from 'react'
import { DragLayer } from 'react-dnd'

const style = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  pointerEvents: 'none'
}

class CustomDragLayer extends Component {
  static propTypes = {}

  getPreviewItem() {
    const { isDragging, item, offset } = this.props
    if (!item || !offset || !isDragging) return null

    const { DragPreview, ...rest } = item
    if (!DragPreview) return null

    const translateStyle = {
      transform: `translate(${offset.x}px, ${offset.y}px)`
    }

    return (
      <div style={translateStyle}>
        <DragPreview {...rest} />
      </div>
    )
  }

  render() {
    const previewItem = this.getPreviewItem()
    if (!previewItem) return null

    return <div style={style}>{previewItem}</div>
  }
}

const collect = (monitor) => ({
  isDragging: monitor.isDragging(),
  item: monitor.getItem(),
  offset: monitor.getSourceClientOffset()
})

export default DragLayer(collect)(CustomDragLayer)
