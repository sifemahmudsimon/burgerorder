import React from 'react'

const Summery = (props) => {

    const ingredientSummary = props.ingredients.map(item => {
        return(
            <li key={item.type}>
                <span style={{textTransform:"capitalize"}}>{item.type}</span> : {item.amount}
            </li>
        )
    })

  return (
    <div>
        <ul>
            {ingredientSummary}
        </ul>
    </div>
  )
}

export default Summery