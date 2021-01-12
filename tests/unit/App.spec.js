import { shallowMount } from '@vue/test-utils';
import fetchMock from 'fetch-mock';
import flushPromises from 'flush-promises';
import App from '@/App.vue';
import generations from '../../__mockData__/generation/index.json';
import firstGeneration from '../../__mockData__/generation/1.json';
import bulbasaur from '../../__mockData__/pokemon-species/1.json';

const factory = (values = {}) => shallowMount(App, {
  data() {
    return {
      ...values,
    };
  },
});

describe('App.vue', () => {
  it('loads generations', async () => {
    fetchMock.get('https://pokeapi.co/api/v2/generation/', generations);

    const wrapper = factory();

    await flushPromises();

    expect(wrapper.vm.generations).toHaveLength(8);
  });

  it('show errors', async () => {
    const wrapper = factory();

    await wrapper.setData({
      error: {
        message: 'error message',
        retryFunction: 'fakeFunction()',
        retryText: 'Retry your last action',
      },
    });

    const errorDialog = wrapper.find('[data-test="error-dialog"]');
    expect(errorDialog.exists()).toBe(true);
    expect(errorDialog.find('p').text()).toBe('Ops! error message');
    expect(errorDialog.find('button').text()).toBe('Retry your last action');
  });

  it('handle generations selection/deselection', async () => {
    fetchMock.get('https://pokeapi.co/api/v2/generation/1', firstGeneration);

    const wrapper = factory();

    wrapper.vm.handleSelectGeneration('https://pokeapi.co/api/v2/generation/1');

    await flushPromises();

    expect(wrapper.vm.generationDetails).toStrictEqual(firstGeneration);

    wrapper.find('[data-test="remove-selection"]').trigger('click');

    expect(wrapper.vm.generationDetails).toBe(null);
  });

  it('show pokemon detail', async () => {
    fetchMock.get('https://pokeapi.co/api/v2/pokemon-species/1/', bulbasaur);

    const wrapper = factory();

    wrapper.vm.showPokemonDetails('https://pokeapi.co/api/v2/pokemon-species/1/');

    await flushPromises();

    expect(wrapper.vm.selectedPokemon).toStrictEqual(bulbasaur);
  });
});
