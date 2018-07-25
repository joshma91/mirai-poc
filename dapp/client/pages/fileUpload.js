import { Form } from "semantic-ui-react";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: ""
    };
  }

  handleFileChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      this.props.callbackFromParent(file, reader.result);
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { isImage } = this.props;
    let { imagePreviewUrl } = this.state;
    let $imagePreview,
      $imageLabel = null;
    if (isImage == "true") {
      $imagePreview = (
        <img
          style={{ width: 200, height: 200 }}
          src="https://www.axiapayments.com/wp-content/uploads/2014/09/placeholder-square.jpg"
        />
      );
      $imageLabel = "Select Image:";
    } else {
      $imageLabel = "Select Book PDF:";
    }
    if (imagePreviewUrl && isImage == "true") {
      $imagePreview = (
        <img style={{ maxWidth: 200, maxHeight: 200 }} src={imagePreviewUrl} />
      );
    }

    return (
      <div>
        {$imagePreview}
        <br />
        {$imageLabel}
        <Form.Input type="file" onChange={this.handleFileChange} />
      </div>
    );
  }
}
export default FileUpload;
