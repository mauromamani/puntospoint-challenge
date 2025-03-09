import { InfoCards } from '@/modules/dashboard/services/queries';
import {
  Box,
  Card as CardMUI,
  CardContent,
  Typography,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';

interface CardProps extends InfoCards {
  isStacked: boolean;
  index: number;
}

export const Card: React.FC<CardProps> = ({ isStacked, index, ...props }) => {
  return (
    <motion.div
      layout
      initial={false}
      animate={{
        marginBottom: isStacked ? -142 : 25,
        zIndex: isStacked ? index + 1 : 1,
        position: 'relative',
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{ width: '100%', maxWidth: '320px' }}
    >
      <CardMUI
        sx={{
          maxWidth: 323,
          borderRadius: '20px',
          backgroundColor: '#fff !important',
          boxShadow: '0px 0px 7px 0px #00000026',
        }}
      >
        <CardContent sx={{ paddingX: '20px', paddingTop: '14px' }}>
          <Typography
            variant='h5'
            component='h5'
            align='center'
            sx={{ fontWeight: 500, fontSize: '16px', color: '#000' }}
            mb='10px'
          >
            {props.mes}
          </Typography>

          <Stack direction='column' spacing='5px'>
            <CardInfoItem title='Clientes' value={props.clientes} />
            <CardInfoItem title='Ventas totales' value={props.ventasTotales} />
            <CardInfoItem title='Monto total' value={props.montoTotal} />
          </Stack>

          <Typography
            variant='h5'
            component='h5'
            sx={{ fontWeight: 500, fontSize: '16px', color: '#000' }}
            my='10px'
          >
            Cashback
          </Typography>

          <Stack direction='column' spacing='5px'>
            <CardInfoItem title='Acumulado' value={props.cashback.acumulado} />

            {props?.cashback?.facturas?.map((factura) => (
              <CardInfoItem
                key={factura.fecha}
                title={`Facturado ${factura.fecha}`}
                value={factura.monto}
              />
            ))}
          </Stack>
        </CardContent>
      </CardMUI>
    </motion.div>
  );
};

interface CardInfoItemProps {
  title: string;
  value: string | number;
}

const CardInfoItem: React.FC<CardInfoItemProps> = ({ title, value }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography component='p' fontSize='14px' fontWeight='400' color='#000'>
        {title}
      </Typography>

      <Typography component='p' fontSize='14px' fontWeight='400' color='#000'>
        {value}
      </Typography>
    </Box>
  );
};
