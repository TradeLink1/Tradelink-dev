

const Button = (props:any) => {
  return (
    <div>
          <button style={{backgroundColor:props.bgColor,border:props.border}} className='px-7 py-2 cursor-pointer '>{props.name}</button>
    </div>
  )
}

export default Button