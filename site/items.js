import rect, {Component} from 'react'

export class Items extends Component {
    render(){
        return(
            <main>
                {this.props.Items.map(el => (
                    <h1>{el.title}</h1>
                ))}
            </main>
        )
    }
}