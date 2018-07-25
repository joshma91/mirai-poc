import { Button } from "semantic-ui-react";

export default class ListProducts extends React.Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        {products.length ? (
          products.map((x, i) => (
            <span key={i}>
              <img
                key={i}
                style={{ maxWidth: 200, maxHeight: 200 }}
                src={x.imagePreviewUrl}
              />
              <span> Number Sold: 0</span>
              <Button>Manage</Button> 
            </span>
          ))
        ) : (
          <span> you do not currently have any products </span>
        )}
      </div>
    );
  }
}
