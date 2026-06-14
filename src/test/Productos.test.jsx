import { render, screen, waitFor } from '@testing-library/react';
import Productos from '../pages/Productos';
import axios from 'axios';

jest.mock('axios');
jest.mock('../components/ModalProducto', () => () => <div data-testid="modal-producto">ModalProducto</div>);
jest.mock('../components/ModalCategoria', () => () => <div data-testid="modal-categoria">ModalCategoria</div>);

describe('Pagina Productos - Pruebas de Cobertura', () => {
  afterEach(() => { 
    jest.clearAllMocks(); 
  });

  test('RF-F01: Renderiza productos obtenidos desde la API ', async () => {
    const mockProducto = {
      idProducto: 1,
      producto: 'Polo Nike',
      precioVenta: 80,
      stock: 10,
      estado: true,
      categoria: { categoria: 'Polos' },
      imagen: '/img/polo.jpg'
    };

    axios.get
      .mockResolvedValueOnce({ data: [] }) 
      .mockResolvedValueOnce({      
        data: [mockProducto]
      });

    render(<Productos />);

    await waitFor(() => {
      expect(screen.getByText(mockProducto.producto)).toBeInTheDocument();
    });

    expect(screen.getByText(new RegExp(mockProducto.precioVenta.toString()))).toBeInTheDocument();
    expect(screen.getByText(mockProducto.stock.toString())).toBeInTheDocument();

    console.log(`
  +--------------------------------------------------------+
  |  TEST RF-F01 PASS (Cobertura: Caso Exitoso)            |
  +--------------------------------------------------------+
  |  Componente: Pagina Productos                          |
  |  Producto:   ${mockProducto.producto}                                 |
  |  Precio:     S/ ${mockProducto.precioVenta}                                     |
  |  Stock:      ${mockProducto.stock}                                        |
  +--------------------------------------------------------+
    `);
  });

  test('RF-F02: Maneja correctamente el estado de error de la API', async () => {
    const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    const errorCategorias = new Error('Error al conectar categorías');
    const errorProductos = new Error('Error al conectar productos');

    axios.get
      .mockRejectedValueOnce(errorCategorias)
      .mockRejectedValueOnce(errorProductos);

    render(<Productos />);

    await waitFor(() => {
      expect(screen.getByText('GESTIÓN DE PRODUCTOS')).toBeInTheDocument();
    });
    
    expect(spyConsoleError).toHaveBeenCalled();

    console.log(`
  +--------------------------------------------------------+
  |  TEST RF-F02 PASS (Cobertura: Manejo de Errores)       |
  +--------------------------------------------------------+
  |  Se ejecutaron y cubrieron las líneas de los CATCH     |
  |  Interceptado: "${errorCategorias.message}"
  |  Interceptado: "${errorProductos.message}"
  +--------------------------------------------------------+
    `);
    
    spyConsoleError.mockRestore();
  });
});