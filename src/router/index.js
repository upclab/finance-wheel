import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/components/Welcome';

import InterestWrapper from '@/components/Interest/InterestWrapper';
import SimpleInterest from '@/components/Interest/SimpleInterest';
import NominalInterest from '@/components/Interest/NominalInterest';
import EffectiveInterest from '@/components/Interest/EffectiveInterest';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/interest',
      component: InterestWrapper,
      children: [
        {
          path: 'simple',
          name: 'interest.simple',
          component: SimpleInterest,
        },
        {
          path: 'nominal',
          name: 'interest.nominal',
          component: NominalInterest,
        },
        {
          path: 'effective',
          name: 'interest.effective',
          component: EffectiveInterest,
        },
      ],
    },
  ],
});
