import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {
  addItemByProductId,
  removeItemByProductId,
  subtractItemByProductId,
} from '../utils/cookies';
import { calculateTotalSum } from '../utils/total-sum';
import { calculateTotalQuantity } from '../utils/totalQuantity';
