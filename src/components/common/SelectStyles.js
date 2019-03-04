const selectStyles = {
  control: (styles, state) => ({ ...styles,
    backgroundColor: 'transparent',
    borderRadius: '0',
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    '&:hover': {
      borderBottom: '2px solid #171d22'
    },
    borderBottom: '2px solid #171d22'
  })
}

export default selectStyles
