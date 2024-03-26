// /* eslint-disable no-unused-vars */
// import DataGrid, {
//   Column, Editing, Popup, Paging, Form,
// } from 'devextreme-react/data-grid';
// import 'devextreme-react/text-area';
// import { Item } from 'devextreme-react/form';
// import { createProduct, getProduct } from '../../Services/ProductService';
// import { useEffect, useState } from 'react';
// import { toast } from "react-toastify";



// // const notesEditorOptions = { height: 100 };
// const ProductPage = () => {
//   const [productData, setProductData] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     Name: '',
//     Price: '',
//     Description: '',
//     Thumbnail: '',
//     Active: false
//   });
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // const response = await getProduct();
//       // setProductData(response.data); // Cập nhật state với dữ liệu sản phẩm từ API
//       const response = await getProduct();
//       // Loại bỏ trường "comments" từ mỗi đối tượng sản phẩm
//       const productsWithoutComments = response.data.map(product => {
//         const { comments, ...productWithoutComments } = product;
//         return productWithoutComments;
//       });
//       setProductData(productsWithoutComments);
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//     }
//   }


//   const handleCreateProduct = async () => {
//     try {
//       await createProduct(newProduct);
//       toast.success('Product created successfully!');
//       fetchData();
//     } catch (error) {
//       console.error('Error creating product:', error);
//       toast.error('Failed to create product!');
//     }
//   };

//   // const handleFormValueChanged = (dataField, value) => {
//   //   console.log('Value changed:', dataField, value);
//   // };

//   // const handleFormValueChanged = (dataField, value) => {
//   //   setNewProduct({
//   //     ...newProduct,
//   //     [dataField]: value
//   //   });
//   // };

//   const handleNameChange = (value) => {
//     setNewProduct({ ...newProduct, Name: value });
//   };

//   const handlePriceChange = (value) => {
//     setNewProduct({ ...newProduct, Price: value });
//   };

//   const handleDescriptionChange = (value) => {
//     setNewProduct({ ...newProduct, Description: value });
//   };

//   const handleThumbnailChange = (value) => {
//     setNewProduct({ ...newProduct, Thumbnail: value });
//   };

//   const handleActiveChange = (value) => {
//     setNewProduct({ ...newProduct, Active: value });
//   };



//   return (
//     <div className='mt-8 mx-10'>
//       <div id="data-grid-demo">
//         <DataGrid
//           dataSource={productData}
//           keyExpr="id"
//           showBorders={true}
//           onRowInserted={(e) => handleCreateProduct(e)}
//         >
//           <Editing
//             mode="popup"
//             allowUpdating={true}
//             allowAdding={true}
//             allowDeleting={true}
//           >
//             <Popup title="Add Product" showTitle={true} width={700} height={325} />
//             <Form>
//               <Item itemType="group" colCount={2} colSpan={2}>
//                 <Item dataField="Name" editorType="dxTextBox" editorOptions={{ onValueChanged: (e) => handleNameChange(e.value) }} />
//                 <Item dataField="Price" editorOptions={{ onValueChanged: (e) => handlePriceChange(e.value) }} />
//                 <Item dataField="Description" editorType="dxTextArea" editorOptions={{ onValueChanged: (e) => handleDescriptionChange(e.value) }} />
//                 <Item dataField="Thumbnail" editorType="dxTextBox" editorOptions={{ onValueChanged: (e) => handleThumbnailChange(e.value) }} />
//                 <Item dataField="Active" editorType="dxCheckBox" editorOptions={{ onValueChanged: (e) => handleActiveChange(e.value) }} />
//               </Item>
//             </Form>
//           </Editing>
//         </DataGrid>
//       </div>
//     </div>
//   )
// }

// export default ProductPage


/* eslint-disable no-unused-vars */
import DataGrid, {
  Column, Editing, Popup, Paging, Form,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import { createProduct, getProduct } from '../../Services/ProductService';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";

const ProductPage = () => {
  const [productData, setProductData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    Name: '',
    Price: '',
    Description: '',
    Thumbnail: '',
    Active: false
  });

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleCreateProduct = async () => {
    try {
      await createProduct(newProduct);
      toast.success('Product created successfully!');
      fetchData();
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product!');
    }
  };

  const handleFieldChange = (fieldName, value) => {
    console.log(fieldName, value)
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
        // onRowInserted={() => handleCreateProduct()}
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

