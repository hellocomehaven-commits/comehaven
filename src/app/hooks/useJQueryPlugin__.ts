// hooks/useJQueryPlugin.ts
import { useEffect, useRef } from 'react';

interface JQueryPluginOptions {
  [key: string]: any;
}

export function useJQueryPlugin(
  pluginName: string, 
  selector: string, 
  options: JQueryPluginOptions = {},
  dependencies: any[] = []
) {
  const initializedRef = useRef(false);

  useEffect(() => {
    const initializePlugin = () => {
      if (initializedRef.current) return;
      
      const $ = (window as any).jQuery;
      if (typeof $ === 'undefined') {
        console.warn(`jQuery not found for plugin: ${pluginName}`);
        setTimeout(initializePlugin, 50);
        return;
      }

      if (typeof $.fn[pluginName] === 'undefined') {
        console.warn(`Plugin ${pluginName} not found`);
        setTimeout(initializePlugin, 100);
        return;
      }

      try {
        const $elements = $(selector);
        if ($elements.length === 0) {
          console.warn(`No elements found for selector: ${selector}`);
          setTimeout(initializePlugin, 100);
          return;
        }

        $elements.each(function(this: HTMLElement) {
          const $el = $(this);
          if (!$el.hasClass(`${pluginName}-initialized`)) {
            $el[pluginName](options);
            $el.addClass(`${pluginName}-initialized`);
            console.log(`Initialized ${pluginName} on`, this);
          }
        });

        initializedRef.current = true;
      } catch (error) {
        console.error(`${pluginName} initialization error:`, error);
      }
    };

    const cleanupPlugin = () => {
      const $ = (window as any).jQuery;
      if (typeof $ === 'undefined') return;

      try {
        $(selector).each(function(this: HTMLElement) {
          const $el = $(this);
          if ($el.hasClass(`${pluginName}-initialized`)) {
            // Plugin-specific cleanup
            if (typeof $el[pluginName] === 'function') {
              // Beberapa plugin punya method destroy
              if (typeof $el[pluginName]().destroy === 'function') {
                $el[pluginName]().destroy();
              }
            }
            
            // Hapus class flag
            $el.removeClass(`${pluginName}-initialized`);
            
            // Cleanup DOM elements yang dibuat plugin
            $el.find('.tip, .tipWrap, .barfiller-bar').remove();
            
            console.log(`Cleaned up ${pluginName} from`, this);
          }
        });
      } catch (error) {
        console.warn(`${pluginName} cleanup warning:`, error);
      }
    };

    // Delay inisialisasi untuk memastikan DOM ready
    const timer = setTimeout(initializePlugin, 200);

    return () => {
      clearTimeout(timer);
      cleanupPlugin();
      initializedRef.current = false;
    };
  }, [pluginName, selector, ...dependencies]); // Include dependencies untuk re-initialize
}