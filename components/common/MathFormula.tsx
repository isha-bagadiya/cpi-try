import React, { CSSProperties, useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathFormulaProps {
    formula: string;
    displayMode?: boolean;
    className?: string;
}

const MathFormula: React.FC<MathFormulaProps> = ({ 
    formula, 
    displayMode = false, 
    className = '' 
}) => {
    // Memoize the HTML generation
    const mathHTML = useMemo(() => {
        try {
            return katex.renderToString(formula, {
                throwOnError: false,
                displayMode: displayMode
            });
        } catch (error) {
            console.error('KaTeX rendering error:', error);
            return formula; // Fallback to plain text if rendering fails
        }
    }, [formula, displayMode]);

    // Memoize the render style
    const renderStyle = useMemo<CSSProperties>(() => 
        displayMode 
            ? { 
                display: 'block', 
                textAlign: 'center',
                fontSize: 'inherit'
            } 
            : { 
                display: 'inline-block' 
            }, 
        [displayMode]
    );

    return (
        <span 
            className={className}
            style={renderStyle}
            dangerouslySetInnerHTML={{ __html: mathHTML }}
        />
    );
};

export default React.memo(MathFormula);