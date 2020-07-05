import React from 'react'

class Debits extends React.Component {

    render() {
        return (
            <div>
                <h1>Debits</h1>

                <div>
                    {this.props.debits.map(deb => <p key={deb.id}>{deb.description}, {deb.amount}, {deb.date}</p>)}
                </div>
            </div>   
        );
    }
}

export default Debits;