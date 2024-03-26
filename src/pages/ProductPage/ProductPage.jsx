


/* eslint-disable no-unused-vars */
import DataGrid, {
  Column, Editing, Popup, Paging, Form,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import { createProduct, deleteProduct, getProduct } from '../../Services/ProductService';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";

const ProductPage = () => {
  const [productData, setProductData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    Name: 'Product 01',
    Price: '111111',
    Description: 'Good Product',
    Thumbnail: 'Oke',
    Active: false
  });

  useEffect(() => {
    fetchData();
  }, []);
  // done
  const fetchData = async () => {
    try {
      const response = await getProduct();
      const productsWithoutComments = response.data.map(product => {
        const { comments, ...productWithoutComments } = product;
        return productWithoutComments;
      });
      setProductData(productsWithoutComments);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }
  // done
  const handleCreateProduct = async () => {
    console.log(newProduct);
    try {
      await createProduct(newProduct);
      toast.success('Product created successfully!');
      fetchData();
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product!');
    }
  };

  // const handleFieldChange = (fieldName, value, e) => {
  //   if (e) {
  //     const updatedValue = e.value; // Lấy giá trị mới từ sự kiện
  //     console.log(fieldName, updatedValue);
  //     setNewProduct((prevProduct) => ({
  //       ...prevProduct,
  //       [fieldName]: updatedValue
  //     }));
  //     return false; // Ngăn chặn sự kiện lan truyền lên các phần tử cha
  //   }
  // };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      toast.success('Product deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product!');
    }
  };

  const handleFieldChange = (fieldName, value) => {
    // Cập nhật giá trị mới cho newProduct
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [fieldName]: value
    }));
  };

  return (
    <div className='mt-8 mx-10'>
      <div id="data-grid-demo">
        <DataGrid
          dataSource={productData}
          keyExpr="id"
          showBorders={true}
          onRowInserted={() => handleCreateProduct()}
          onRowRemoving={(e) => {
            const id = e.key;
            handleDeleteProduct(id);
          }}
        >
          <Editing
            mode="popup"
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
          >
            <Popup title="Add Product" showTitle={true} width={700} height={325} />
            <Form>
              <Item itemType="group" colCount={2} colSpan={2}>
                <Item
                  dataField="Name"
                  editorType="dxTextBox"
                  editorOptions={{ onValueChanged: (e) => handleFieldChange("Name", e.value), defaultValue: newProduct.Name }}
                />
                <Item
                  dataField="Price"
                  editorOptions={{ onValueChanged: (e) => handleFieldChange("Price", e.value), defaultValue: newProduct.Price }}
                />
                <Item
                  dataField="Description"
                  editorType="dxTextArea"
                  editorOptions={{ onValueChanged: (e) => handleFieldChange("Description", e.value), defaultValue: newProduct.Description }}
                />
                <Item
                  dataField="Thumbnail"
                  editorType="dxTextBox"
                  editorOptions={{ onValueChanged: (e) => handleFieldChange("Thumbnail", e.value), defaultValue: newProduct.Thumbnail }}
                />
                <Item
                  dataField="Active"
                  editorType="dxCheckBox"
                  editorOptions={{ onValueChanged: (e) => handleFieldChange("Active", e.value), value: newProduct.Active }}
                />
              </Item>
            </Form>
          </Editing>
        </DataGrid>
      </div>
    </div>
  )
}

export default ProductPage;

