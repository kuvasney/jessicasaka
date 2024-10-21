import { describe, it, expect, vi } from "vitest";
import planta from "./planta.vue";
import { mount } from '@vue/test-utils'

describe('Planta', () => {
  it('Deve exibir a página', () => {
    // Mock do canvas
    const getContextMock = vi.fn(() => ({
      fillStyle: null,
      font: null,
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      fillText: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn()
    }));

    // Simula um canvas no DOM com o getContext mockado
    Object.defineProperty(global.HTMLCanvasElement.prototype, 'getContext', {
      value: getContextMock,
    });

    const wrapper = mount(planta)

    expect(wrapper.text()).toContain('Planta baixa / 2D')
  })
})
