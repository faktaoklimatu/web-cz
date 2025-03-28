require 'ffi-icu'
require 'pp'

module Jekyll
  module SortFallbackFilter
    def nil_safe_compare(a, b)
      result = a <=> b

      if result
        result
      elsif a.nil?
        1
      elsif b.nil?
        -1
      else
        raise ArgumentError, "cannot sort values of incompatible types"
      end
    end

    # More or less lifted from the Liquid Templates source code (MIT licensed):
    # https://github.com/Shopify/liquid/blob/a398b4cc747fafa774bc52e602262ed0136febbd/lib/liquid/standardfilters.rb#L379-L395
    def sort_fallback(input, property, fallback_property)
      ary = Liquid::StandardFilters::InputIterator.new(input)

      return [] if input.empty?

      if input.all? { |el| el.respond_to?(:[]) }
        input.sort do |a, b|
          nil_safe_compare(a[property] || a[fallback_property], b[property] || b[fallback_property])
        end
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::SortFallbackFilter)
