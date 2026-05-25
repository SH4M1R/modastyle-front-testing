import { render, screen, waitFor } from '@testing-library/react';
import Productos from '../pages/Productos';
import axios from 'axios';

jest.mock('axios');

jest.mock('../components/ModalProducto', () => () => <div>ModalProducto</div>);
jest.mock('../components/ModalCategoria', () => () => <div>ModalCategoria</div>);

describe('Página Productos', () => {

  test('renderiza productos obtenidos desde la API', async () => {

    axios.get
      .mockResolvedValueOnce({
        data: []
      })
      .mockResolvedValueOnce({
        data: [
          {
            idProducto: 1,
            producto: 'Polo Nike',
            precioVenta: 80,
            stock: 10,
            estado: true,
            categoria: {
              categoria: 'Polos'
            },
            imagen: '/img/polo.jpg'
          }
        ]
      });

    render(<Productos />);

    await waitFor(() => {
      expect(screen.getByText('Polo Nike')).toBeInTheDocument();
    });

    // IMPRESIONES EN CONSOLA
    console.log("TEST RF-F01 PASS");
    console.log("Producto renderizado: Polo Nike");
    console.log("Precio renderizado: S/ 80");
    console.log("Stock renderizado: 10");

    screen.debug();
    expect(screen.getByText('S/ 80')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

  });

});