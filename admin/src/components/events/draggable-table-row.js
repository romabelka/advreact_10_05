import { DragSource } from 'react-dnd'
import { defaultTableRowRenderer } from 'react-virtualized'

const DraggableTableRow = ({ connectDragSource, ...props }) =>
  connectDragSource(defaultTableRowRenderer(props))

const spec = {
  beginDrag(props) {
    return {
      uid: props.rowData.uid
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource()
})

export default DragSource('event', spec, collect)(DraggableTableRow)
