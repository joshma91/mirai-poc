import { Form } from "semantic-ui-react";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: ""
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { imgPlaceholder } = this.props;
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imgPlaceholder == "true") {
      $imagePreview = (
        <img
          style={{ width: 200, height: 200 }}
          src="https://www.axiapayments.com/wp-content/uploads/2014/09/placeholder-square.jpg"
        />
      );
    }
    if (imagePreviewUrl && imgPlaceholder == "true") {
      $imagePreview = (
        <img style={{ maxWidth: 200, maxHeight: 200 }} src={imagePreviewUrl} />
      );
    }

    return (
      <div>
        {$imagePreview}
        <Form.Input type="file" onChange={this._handleImageChange} />
      </div>
    );
  }
}
export default ImageUpload;