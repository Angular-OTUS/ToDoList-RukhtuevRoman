import { Directive, ElementRef, HostListener, input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { TTooltipPosition } from './types';

@Directive({
    selector: '[appTooltip]',
    standalone: true,
})
export class Tooltip implements OnInit, OnDestroy {
    public tooltipText = input('', { alias: 'appTooltip' });
    public tooltipPosition = input<TTooltipPosition>('top');
    public tooltipDelay = input(200);

    private tooltipElement: HTMLElement | null = null;
    private isVisible: boolean = false;
    private showTimeout: ReturnType<typeof setTimeout> | undefined;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {}

    public ngOnInit(): void {
        if (this.tooltipText()) {
            this.createTooltipElement();
        }
    }

    public ngOnDestroy(): void {
        if (this.tooltipElement) {
            this.renderer.removeChild(document.body, this.tooltipElement);
        }
        clearTimeout(this.showTimeout);
    }

    @HostListener('mouseenter')
    protected onMouseEnter(): void {
        this.showTimeout = setTimeout(() => {
            this.showTooltip();
        }, this.tooltipDelay());
    }

    @HostListener('mouseleave')
    protected onMouseLeave(): void {
        clearTimeout(this.showTimeout);
        this.hideTooltip();
    }

    @HostListener('click')
    protected onClick(): void {
        this.hideTooltip();
    }

    @HostListener('window:scroll')
    protected onWindowScroll(): void {
        if (this.isVisible) {
            this.updateTooltipPosition();
        }
    }

    @HostListener('window:resize')
    protected onWindowResize(): void {
        if (this.isVisible) {
            this.updateTooltipPosition();
        }
    }

    private createTooltipElement(): void {
        this.tooltipElement = this.renderer.createElement('div');
        this.renderer.setProperty(this.tooltipElement, 'textContent', this.tooltipText());
        this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
        this.renderer.setStyle(this.tooltipElement, 'position', 'fixed');
        this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
        this.renderer.setStyle(this.tooltipElement, 'pointer-events', 'none');
        this.renderer.setStyle(this.tooltipElement, 'background-color', '#333');
        this.renderer.setStyle(this.tooltipElement, 'padding', '5px 10px');
        this.renderer.setStyle(this.tooltipElement, 'border-radius', '4px');
        this.renderer.setStyle(this.tooltipElement, 'color', '#ddd');
        this.renderer.appendChild(document.body, this.tooltipElement);
    }

    private showTooltip(): void {
        if (this.tooltipElement && this.tooltipText()) {
            this.isVisible = true;
            this.updateTooltipPosition();
            this.renderer.setStyle(this.tooltipElement, 'opacity', '1');
        }
    }

    private updateTooltipPosition(): void {
        if (this.tooltipElement) {
            const hostRect = this.el.nativeElement.getBoundingClientRect();
            const tooltipRect = this.tooltipElement.getBoundingClientRect();

            let top: number;
            let left: number;

            switch (this.tooltipPosition()) {
                case 'top':
                    top = hostRect.top - tooltipRect.height - 8;
                    left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
                    break;
                case 'bottom':
                    top = hostRect.bottom + 8;
                    left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
                    break;
                case 'left':
                    top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
                    left = hostRect.left - tooltipRect.width - 8;
                    break;
                case 'right':
                    top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
                    left = hostRect.right + 8;
                    break;
                default:
                    top = hostRect.top - tooltipRect.height - 8;
                    left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
            }

            this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
            this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
        }
    }

    private hideTooltip(): void {
        if (this.tooltipElement) {
            this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
            this.isVisible = false;
        }
    }
}
