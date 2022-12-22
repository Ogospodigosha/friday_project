export const style = {
  table: {
    minWidth: 650,
  },
  tableRow: {
    '&:last-child td, &:last-child th': { border: 0 },
  },
  container: {
    fontFamily: 'Montserrat, sans-serif',
    margin: '30px 0 0 0',
  },
  addNewCard: {
    background: '#366EFF',
    boxShadow: '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
    borderRadius: '30px',
    width: '171px',
    height: '36px',
  },
  tableHead: {
    background: '#efefef',
  },
  tableHeadTableCell: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '17px',
  },
  tableRowTableCell: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '200px',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '16px',
  },
  editDelete: {
    width: '110px',
    cursor: 'pointer',
  },
  tableRowStars: {},
}
